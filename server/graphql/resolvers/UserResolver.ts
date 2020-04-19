import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { RegisterUserInputType } from '../inputTypes'
import { ServiceName, UserService } from '../../services'
import { UserType } from '../types'

@Service()
@Resolver(UserType)
class UserResolver {
  constructor(@Inject(ServiceName.User) private readonly userService: UserService) {}

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

  @Mutation(returns => UserType)
  public registerUser(@Arg('input') input: RegisterUserInputType): number {
    return 22
  }
}

export default UserResolver
