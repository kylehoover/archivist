import { Arg, ID, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { ServiceName, UserRegistrationRequestService } from '../../services'
import { UserRegistrationRequestType } from '../types'

@Service()
@Resolver(UserRegistrationRequestType)
class UserRegistrationRequestResolver {
  constructor(
    @Inject(ServiceName.UserRegistrationRequest)
    private readonly registrationRequestService: UserRegistrationRequestService,
  ) {}

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
}

export default UserRegistrationRequestResolver
