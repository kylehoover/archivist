import { Field, ObjectType } from 'type-graphql'

import { User } from '../../models'
import { generateAccessToken } from '../../helpers/auth'

@ObjectType()
class RefreshTokensType {
  @Field()
  public accessToken: string

  constructor(accessTokenOrUser: string | User) {
    if (accessTokenOrUser instanceof User) {
      this.accessToken = generateAccessToken(accessTokenOrUser)
    } else {
      this.accessToken = accessTokenOrUser
    }
  }
}

export default RefreshTokensType
