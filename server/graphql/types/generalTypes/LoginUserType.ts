import { Field, ObjectType } from 'type-graphql'

import { User } from '../../../models'
import { UserType } from '../modelTypes'
import { generateAccessToken } from '../../../helpers/auth'

@ObjectType()
class LoginUserType {
  @Field()
  public accessToken: string

  @Field(type => UserType)
  public user: UserType

  constructor(user: User)
  constructor(accessToken: string, user: User)
  constructor(accessTokenOrUser: string | User, user?: User) {
    if (accessTokenOrUser instanceof User) {
      this.accessToken = generateAccessToken(accessTokenOrUser)
      this.user = accessTokenOrUser.toGraphQLType()
    } else {
      this.accessToken = accessTokenOrUser
      this.user = user!.toGraphQLType()
    }
  }
}

export default LoginUserType
