import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Request } from 'express'

import DataProvider from '../../DataProvider'
import User, { RegistrationType, UserFields } from '../../models/User'
import { InvalidCredentialsError, NotAllowedError, UnauthorizedError } from '../errors'
import { LoginUserInputType, RegisterUserInputType } from '../inputTypes'
import { LoginUserType, RefreshTokensType, UserType } from '../types'
import { NotLoggedIn } from '../decorators'
import { RegistrationState } from '../../models/AppSetting'
import { ServiceName, UserService } from '../../services'
import { validateEmailIsAvailable } from '../auth'
import { verifyRefreshToken } from '../../helpers/auth'
import { withNewModelFields, withUpdatedModelFields } from '../../models/Model'

import {
  generateRefreshToken,
  getNormalizedEmail,
  hashPassword,
  setRefreshTokenCookie,
} from '../../helpers/auth'

@Service()
@Resolver(UserType)
class UserResolver {
  constructor(@Inject(ServiceName.User) private readonly userService: UserService) {}

  // Queries //

  @Query(returns => UserType, { nullable: true })
  public async user(@Arg('id', type => ID) id: string): Promise<UserType | undefined> {
    const user = await this.userService.findById(id)
    return user?.toGraphQLType()
  }

  @Query(returns => [UserType])
  public async users(): Promise<UserType[]> {
    const users = await this.userService.findAll()
    return users.map(u => u.toGraphQLType())
  }

  // Mutations //

  @Mutation(returns => LoginUserType)
  @NotLoggedIn()
  public async loginUser(
    @Arg('input') input: LoginUserInputType,
    @Ctx() req: Request,
  ): Promise<LoginUserType> {
    const email = getNormalizedEmail(input.email)
    const user = await this.userService.findByEmail(email)

    if (user === null || !user.passwordMatches(input.password)) {
      throw new InvalidCredentialsError()
    }

    await this.setRefreshToken(req, user)
    return new LoginUserType(user)
  }

  @Mutation(returns => RefreshTokensType)
  public async refreshTokens(@Ctx() req: Request): Promise<RefreshTokensType> {
    if (req.cookies.refreshToken === undefined) {
      throw new UnauthorizedError(req.accessTokenState)
    }

    try {
      verifyRefreshToken(req.cookies.refreshToken)
    } catch (err) {
      throw new UnauthorizedError(req.accessTokenState)
    }

    const user = await this.userService.findByRefreshToken(req.cookies.refreshToken)

    if (user === null) {
      throw new UnauthorizedError(req.accessTokenState)
    }

    await this.setRefreshToken(req, user)
    return new RefreshTokensType(user)
  }

  @Mutation(returns => LoginUserType)
  @NotLoggedIn()
  public async registerUser(
    @Arg('input') input: RegisterUserInputType,
    @Ctx() req: Request,
  ): Promise<LoginUserType> {
    if (DataProvider.getAppSettingsMap().userRegistrationState !== RegistrationState.Open) {
      throw new NotAllowedError()
    }

    const email = getNormalizedEmail(input.email)
    await validateEmailIsAvailable(email, this.userService)

    const fields: UserFields = {
      name: input.name,
      email,
      roleId: DataProvider.getDefaultUserRoleId(),
      password: hashPassword(input.password),
      registration: {
        type: RegistrationType.OpenRegistration,
      },
    }

    const user = await this.userService.insertOne(withNewModelFields(fields))
    await this.setRefreshToken(req, user)
    return new LoginUserType(user)
  }

  private async setRefreshToken(req: Request, user: User): Promise<void> {
    const refreshToken = generateRefreshToken()
    await this.userService.updateById(user.id, withUpdatedModelFields({ refreshToken }))
    setRefreshTokenCookie(req, refreshToken)
  }
}

export default UserResolver
