import { Field, ObjectType } from 'type-graphql'

import UserType from './UserType'
import { User } from '../../models'

@ObjectType()
class LoginUserType {
  @Field()
  public accessToken: string

  @Field(type => UserType)
  public user: UserType

  constructor(accessToken: string, user: User) {
    this.accessToken = accessToken
    this.user = user.toGraphQLType()
  }
}

export default LoginUserType
