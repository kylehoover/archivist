import { Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { ServiceName, UserRoleService } from '../../services'
import { UserRoleType } from '../types'

@Service()
@Resolver(UserRoleType)
export class UserRoleResolver {
  constructor(@Inject(ServiceName.UserRole) private readonly userRoleService: UserRoleService) {}

  @Query(returns => [UserRoleType])
  public async userRoles(): Promise<UserRoleType[]> {
    const userRoles = await this.userRoleService.findAll()
    return userRoles.map(u => u.toGraphQLType())
  }
}
