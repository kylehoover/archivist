import { Field, ObjectType } from 'type-graphql'

import ModelType from './ModelType'
import PermissionType from './PermissionType'
import UserRole, { PermissionName } from '../../models/UserRole'

@ObjectType()
class UserRoleType extends ModelType {
  @Field()
  public name: string

  @Field()
  public isDefault: boolean

  @Field()
  public isReadonly: boolean

  @Field(type => [PermissionType])
  public permissions: PermissionType[]

  constructor(userRole: UserRole) {
    super(userRole)
    this.name = userRole.name
    this.isDefault = userRole.isDefault
    this.isReadonly = userRole.isReadonly
    this.permissions = Object.values(PermissionName).map(
      name => new PermissionType(name, userRole.permissions[name])
    )
  }
}

export default UserRoleType
