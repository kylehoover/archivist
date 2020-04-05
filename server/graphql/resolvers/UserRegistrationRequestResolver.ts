import { Arg, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { ServiceName, UserRegistrationRequestService } from '../../services'
import { UserRegistrationRequestType } from '../types'

@Service()
@Resolver(UserRegistrationRequestType)
class UserRegistrationRequestResolver {
  constructor(@Inject(ServiceName.User) private readonly userService: UserRegistrationRequestService) {}

  @Query(returns => UserRegistrationRequestType)
  public async userRegistrationRequest(@Arg('id') id: string): Promise<UserRegistrationRequestType | undefined> {
    const user = await this.userService.findById(id)
    return user?.toGraphQLType()
  }

  @Query(returns => [UserRegistrationRequestType])
  public async userRegistrationRequests(): Promise<UserRegistrationRequestType[]> {
    const users = await this.userService.findAll()
    return users.map(u => u.toGraphQLType())
  }
}

export default UserRegistrationRequestResolver
