import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { ServiceName, UserService } from '../../services'
import { RegisterUserInput, UserType } from '../types'

@Service()
@Resolver(UserType)
class UserResolver {
  constructor(@Inject(ServiceName.User) private readonly userService: UserService) {}

  @Query(returns => UserType)
  public async user(@Arg('id') id: string): Promise<UserType | undefined> {
    const user = await this.userService.findById(id)
    return user?.toGraphQLType()
  }

  @Query(returns => [UserType])
  public async users(): Promise<UserType[]> {
    const users = await this.userService.findAll()
    return users.map(u => u.toGraphQLType())
  }

  @Mutation(returns => UserType)
  public registerUser(@Arg('input') input: RegisterUserInput): number {
    return 22
  }
}

export default UserResolver
