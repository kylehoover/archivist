import { observable } from 'mobx'

import { Model, Permissions, getPermissionsFromGraphQLType } from './'
import { UserType } from '../graphql'

class User extends Model {
  @observable public name: string
  @observable public email: string
  public readonly permissions: Permissions

  constructor(
    id: string,
    name: string,
    email: string,
    permissions: Permissions,
    createdAt?: Date,
    modifiedAt?: Date
  ) {
    super(id, createdAt, modifiedAt)
    this.name = name
    this.email = email
    this.permissions = permissions
  }

  public static fromGraphQLType(data: UserType): User {
    return new User(data.id, data.name, data.email, getPermissionsFromGraphQLType(data.permissions),
      data.createdAt, data.modifiedAt)
  }
}

export default User
