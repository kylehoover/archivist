import { Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'

import { UserRole } from '../../models'
import { UserRoleType } from '../types'

@Service()
@Resolver(UserRoleType)
class UserRoleResolver {
  @Query(returns => [UserRoleType])
  public async userRoles(): Promise<UserRoleType[]> {
    const roles: UserRole[] = [UserRole.fromMongo({_id: '1', createdAt: new Date(),
    modifiedAt: new Date(), name: 'Admin',
    permissions: { canAcceptUserRegistrationRequests: true, canEditAppSettings: true, canEditUserRoles: false,
      canInviteUsers: true }})]
    return roles.map(r => r.toGraphQLType())
  }
}

export default UserRoleResolver
