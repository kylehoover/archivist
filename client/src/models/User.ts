import { observable } from 'mobx'

import Model from './Model'
import { Permissions } from './UserRole'

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
}

export default User
