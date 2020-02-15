import { Field, ObjectType } from 'type-graphql'

import Model from './Model'
import Role from './Role'

@ObjectType()
class User extends Model {
  @Field()
  public email!: string

  @Field()
  public firstName!: string

  @Field({ nullable: true })
  public lastName?: string

  @Field(type => Role, { description: 'The user\'s application-wide role' })
  public role!: Role
}

export default User
