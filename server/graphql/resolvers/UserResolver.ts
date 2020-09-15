import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Request } from 'express'

import DataProvider from '../../DataProvider'
import { Authorized, CurrentUser, NotLoggedIn } from '../decorators'
import { InvalidCredentialsError, NotAllowedError, UnauthorizedError, UnknownError } from '../errors'
import { ServiceName, UserService } from '../../services'
import { VoidScalar } from '../scalars'
import { validateEmailIsAvailable } from '../auth'

import {
  LoginUserInputType,
  LoginUserType,
  RefreshTokensType,
  RegisterUserInputType,
  UserType,
} from '../types'

import {
  RegistrationState,
  RegistrationType,
  RequestUserInfo,
  User,
  UserFields,
  withNewModelFields,
  withUpdatedModelFields,
} from '../../models'

import {
  generateRefreshToken,
  getNormalizedEmail,
  hashPassword,
  setRefreshTokenCookie,
  verifyRefreshToken,
} from '../../helpers'

@Service()
@Resolver(UserType)
class UserResolver {
  constructor(@Inject(ServiceName.User) private readonly userService: UserService) {}

  // Queries //

  @Query(returns => UserType)
  @Authorized()
  public async currentUser(@CurrentUser() userInfo: RequestUserInfo): Promise<UserType> {
    const user = await this.userService.findById(userInfo.userId)

    if (user === null) {
      throw new UnknownError('Data Integrity Error: The logged in user does not exist.')
    }

    return user.toGraphQLType()
  }

  @Query(returns => UserType, { nullable: true })
  public async user(@Arg('id', type => ID) id: string): Promise<UserType | undefined> {
    const user = await this.userService.findById(id)
    return user?.toGraphQLType()
  }

  @Query(returns => [UserType])
  @Authorized()
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

  @Mutation(returns => VoidScalar, { nullable: true })
  @Authorized()
  public async logoutUser(@Ctx() req: Request): Promise<void> {
    await this.userService.updateById(req.userInfo!.userId, withUpdatedModelFields({ refreshToken: undefined }))

    // eslint-disable-next-line no-unused-expressions
    req.res?.clearCookie('refreshToken')
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

  // Helpers //

  private async setRefreshToken(req: Request, user: User): Promise<void> {
    const refreshToken = generateRefreshToken()
    await this.userService.updateById(user.id, withUpdatedModelFields({ refreshToken }))
    setRefreshTokenCookie(req, refreshToken)
  }
}

export default UserResolver
