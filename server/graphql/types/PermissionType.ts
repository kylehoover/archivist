import { Field, ObjectType } from 'type-graphql'

import { PermissionName } from '../../models/UserRole'

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

export default PermissionType
