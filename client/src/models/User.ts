import { observable } from 'mobx'

import { Model, ModelFields, Permissions, getPermissionsFromGraphQLType } from './'
import { UserType } from '../graphql'

export interface UserFields extends ModelFields {
  name: string
  email: string
  permissions: Permissions
}

class User extends Model {
  @observable public name: string
  @observable public email: string
  public readonly permissions: Permissions

  constructor(fields: UserFields) {
    super(fields)
    this.name = fields.name
    this.email = fields.email
    this.permissions = fields.permissions
  }

  public static fromGraphQLType(data: UserType): User {
    return new User({ ...data, permissions: getPermissionsFromGraphQLType(data.permissions) })
  }
}

export default User
