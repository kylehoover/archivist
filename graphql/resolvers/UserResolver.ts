import { Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'

import { User } from '../types'

@Service()
@Resolver(User)
class UserResolver {
  @Query(returns => [User])
  public users(): User[] {
    return []
  }
}

export default UserResolver
