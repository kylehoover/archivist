import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'

import { RegisterUserInput } from '../types'
import { User } from '../types'

@Service()
@Resolver(User)
class UserResolver {
  @Query(returns => [User])
  public users(): User[] {
    return []
  }

  @Mutation(returns => User)
  public registerUser(@Arg('input') input: RegisterUserInput): User {
    const u = new User()
    u.id = '1'
    return u
  }
}

export default UserResolver
