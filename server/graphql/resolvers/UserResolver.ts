import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Request } from 'express'

import DataProvider from '../../DataProvider'
import { InvalidCredentialsError, NotAllowedError, UnauthorizedError } from '../errors'
import { LoginUserInputType, RegisterUserInputType } from '../inputTypes'
import { LoginUserType, RefreshTokensType, UserType } from '../types'
import { NotLoggedIn } from '../decorators'
import { RegistrationType, UserFields } from '../../models/User'
import { ServiceName, UserService } from '../../services'
import { UserRegistrationStatusValue } from '../../models/AppSetting'
import { generateRefreshToken, hashPassword, setRefreshTokenCookie } from '../../helpers/auth'
import { withNewModelFields, withUpdatedModelFields } from '../../models/Model'

@Service()
@Resolver(UserType)
class UserResolver {
  constructor(@Inject(ServiceName.User) private readonly userService: UserService) {}

  // QUERIES //

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

  // MUTATIONS //

  @Mutation(returns => LoginUserType)
  @NotLoggedIn()
  public async loginUser(
    @Arg('input') input: LoginUserInputType,
    @Ctx() req: Request,
  ): Promise<LoginUserType> {
    const user = await this.userService.findByEmail(input.email)

    if (user === null || !user.passwordMatches(input.password)) {
      throw new InvalidCredentialsError()
    }

    const refreshToken = generateRefreshToken()
    await this.userService.updateById(user.id, withUpdatedModelFields({ refreshToken }))
    setRefreshTokenCookie(req, refreshToken)
    return new LoginUserType(user)
  }

  @Mutation(returns => RefreshTokensType)
  public async refreshTokens(@Ctx() req: Request): Promise<RefreshTokensType> {
    if (req.cookies.refreshToken === undefined) {
      throw new UnauthorizedError(req.accessTokenState)
    }

    const user = await this.userService.findByRefreshToken(req.cookies.refreshToken)

    if (user === null) {
      throw new UnauthorizedError(req.accessTokenState)
    }

    const newRefreshToken = generateRefreshToken()
    await this.userService.updateById(user.id, withUpdatedModelFields({ refreshToken: newRefreshToken }))
    setRefreshTokenCookie(req, newRefreshToken)
    return new RefreshTokensType(user)
  }

  @Mutation(returns => UserType)
  public async registerUser(@Arg('input') input: RegisterUserInputType): Promise<UserType> {
    if (DataProvider.getAppSettingsMap().userRegistrationStatus !== UserRegistrationStatusValue.Open) {
      throw new NotAllowedError()
    }

    const fields: UserFields = {
      name: input.name,
      email: input.email,
      roleId: DataProvider.getDefaultUserRoleId(),
      password: hashPassword(input.password),
      registration: {
        type: RegistrationType.OpenRegistration,
      },
    }

    const user = await this.userService.insertOne(withNewModelFields(fields))
    return user.toGraphQLType()
  }
}

export default UserResolver
