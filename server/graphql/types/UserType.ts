import { Field, ObjectType } from 'type-graphql'

import ModelType from './ModelType'
import { User } from '../../models'

@ObjectType()
class UserType extends ModelType {
  @Field()
  public email: string

  @Field()
  public name: string

  constructor(user: User) {
    super(user)
    this.email = user.email
    this.name = user.name
  }
}

export default UserType
