import { Arg, ID, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { ServiceName, UserRegistrationInvitationService } from '../../services'
import { UserRegistrationInvitationType } from '../types'

@Service()
@Resolver(UserRegistrationInvitationType)
class UserRegistrationInvitationResolver {
  constructor(@Inject(ServiceName.User) private readonly userService: UserRegistrationInvitationService) {}

  @Query(returns => UserRegistrationInvitationType, { nullable: true })
  public async userRegistrationInvitation(
    @Arg('id', type => ID) id: string,
  ): Promise<UserRegistrationInvitationType | undefined> {
    const user = await this.userService.findById(id)
    return user?.toGraphQLType()
  }

  @Query(returns => [UserRegistrationInvitationType])
  public async userRegistrationInvitations(): Promise<UserRegistrationInvitationType[]> {
    const users = await this.userService.findAll()
    return users.map(u => u.toGraphQLType())
  }
}

export default UserRegistrationInvitationResolver
