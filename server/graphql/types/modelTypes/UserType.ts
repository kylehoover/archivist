import { Field, ObjectType } from 'type-graphql'

import ModelType from './ModelType'
import PermissionType from './PermissionType'
import { PermissionName, User } from '../../../models/'

@ObjectType()
class UserType extends ModelType {
  @Field()
  public email: string

  @Field()
  public name: string

  @Field(type => [PermissionType])
  public permissions: PermissionType[]

  constructor(user: User) {
    super(user)

    this.email = user.email
    this.name = user.name
    this.permissions = Object.values(PermissionName).map(
      name => new PermissionType(name, user.role.permissions[name])
    )
  }
}

export default UserType
