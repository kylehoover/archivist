import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Request } from 'express'

import DataProvider from '../../DataProvider'
import { LoginInputType, RegisterUserInputType } from '../inputTypes'
import { LoginType, UserType } from '../types'
import { RegistrationType, UserFields } from '../../models/User'
import { ServiceName, UserService } from '../../services'
import { UserRegistrationStatusValue } from '../../models/AppSetting'
import { generateAccessToken, generateRefreshToken, hashPassword } from '../../helpers/auth'
import { withNewModelFields } from '../../models/Model'

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

  @Mutation(returns => LoginType)
  public async login(@Arg('input') input: LoginInputType, @Ctx() ctx: Request): Promise<LoginType> {
    // TODO: check if user already logged in, store refresh token in db

    const user = await this.userService.findByEmail(input.email)

    if (user === null || !user.passwordMatches(input.password)) {
      throw new Error('Invalid credentials')
    }

    return new LoginType(generateAccessToken(user), generateRefreshToken(), user)
  }

  @Mutation(returns => UserType)
  public async registerUser(@Arg('input') input: RegisterUserInputType): Promise<UserType> {
    if (DataProvider.getAppSettingsMap().userRegistrationStatus !== UserRegistrationStatusValue.Open) {
      throw new Error('Not allowed')
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
