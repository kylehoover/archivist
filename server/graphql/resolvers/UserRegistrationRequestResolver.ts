import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import DataProvider from '../../DataProvider'
import { NotAllowedError } from '../errors'
import { RegistrationState } from '../../models/AppSetting'
import { ServiceName, UserRegistrationRequestService, UserService } from '../../services'
import { SubmitRegistrationRequestInputType } from '../inputTypes'
import { UserRegistrationRequestFields } from '../../models/UserRegistrationRequest'
import { UserRegistrationRequestType } from '../types'
import { getNormalizedEmail } from '../../helpers/auth'
import { hashPassword } from '../../helpers/auth'
import { validateEmailIsAvailable } from '../auth'
import { withNewModelFields } from '../../models/Model'

@Service()
@Resolver(UserRegistrationRequestType)
class UserRegistrationRequestResolver {
  constructor(
    @Inject(ServiceName.UserRegistrationRequest)
    private readonly registrationRequestService: UserRegistrationRequestService,
    @Inject(ServiceName.User)
    private readonly userService: UserService,
  ) {}

  // Queries

  @Query(returns => UserRegistrationRequestType, { nullable: true })
  public async userRegistrationRequest(
    @Arg('id', type => ID) id: string,
  ): Promise<UserRegistrationRequestType | undefined> {
    const user = await this.registrationRequestService.findById(id)
    return user?.toGraphQLType()
  }

  @Query(returns => [UserRegistrationRequestType])
  public async userRegistrationRequests(): Promise<UserRegistrationRequestType[]> {
    const users = await this.registrationRequestService.findAll()
    return users.map(u => u.toGraphQLType())
  }

  // Mutations

  @Mutation(returns => UserRegistrationRequestType)
  public async submitRegistrationRequest(
    @Arg('input') input: SubmitRegistrationRequestInputType,
  ): Promise<UserRegistrationRequestType> {
    if (DataProvider.getAppSettingsMap().userRegistrationState !== RegistrationState.ByRequest) {
      throw new NotAllowedError()
    }

    const email = getNormalizedEmail(input.email)
    await validateEmailIsAvailable(email, this.userService)

    const fields: UserRegistrationRequestFields = {
      name: input.name,
      email,
      password: hashPassword(input.password),
    }

    const registrationRequest = await this.registrationRequestService.insertOne(withNewModelFields(fields))
    return registrationRequest.toGraphQLType()
  }
}

export default UserRegistrationRequestResolver
