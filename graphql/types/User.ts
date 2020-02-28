import { Field, ObjectType } from 'type-graphql'

import Model from './Model'

@ObjectType()
class User extends Model {
  @Field()
  public email!: string

  @Field()
  public name!: string
}

export default User
