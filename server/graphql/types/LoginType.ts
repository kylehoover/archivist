import { Field, ObjectType } from 'type-graphql'

import UserType from './UserType'
import { User } from '../../models'

@ObjectType()
class LoginType {
  @Field()
  public accessToken: string

  @Field()
  public refreshToken: string

  @Field(type => UserType)
  public user: UserType

  constructor(accessToken: string, refreshToken: string, user: User) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.user = user.toGraphQLType()
  }
}

export default LoginType
