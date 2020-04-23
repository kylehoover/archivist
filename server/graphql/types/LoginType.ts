import { Field, ObjectType } from 'type-graphql'

import UserType from './UserType'
import { User } from '../../models'

@ObjectType()
class LoginType {
  @Field()
  public jwt: string

  @Field()
  public refreshToken: string

  @Field(type => UserType)
  public user: UserType

  constructor(jwt: string, refreshToken: string, user: User) {
    this.jwt = jwt
    this.refreshToken = refreshToken
    this.user = user.toGraphQLType()
  }
}

export default LoginType
