import { Field, ObjectType } from 'type-graphql'

import ModelType from './ModelType'
import UserRole, { PermissionName } from '../../models/UserRole'

@ObjectType()
class PermissionType {
  @Field()
  public name!: PermissionName

  @Field()
  public value!: boolean

  constructor(name: PermissionName, value: boolean) {
    this.name = name
    this.value = value
  }
}

@ObjectType()
class UserRoleType extends ModelType {
  @Field()
  public name: string

  @Field(type => [PermissionType])
  public permissions: PermissionType[]

  constructor(userRole: UserRole) {
    super(userRole)
    this.name = userRole.name
    this.permissions = Object.values(PermissionName).map(
      name => new PermissionType(name, userRole.permissions[name])
    )
  }
}

export default UserRoleType
