import Model, { MongoModelFields, NewModelFields } from './Model'
import { UserRoleType } from '../graphql/types'

export type UserRoleFields = {
  name: string
  permissions: Permissions
}

export type NewUserRoleModelFields = NewModelFields & UserRoleFields

export enum PermissionName {
  CanAcceptUserRegistrationRequests = 'canAcceptUserRegistrationRequests',
  CanEditAppSettings = 'canEditAppSettings',
  CanEditUserRoles = 'canEditUserRoles',
  CanInviteUsers = 'canInviteUsers',
}

type Permissions = {
  [name in PermissionName]: boolean
}

type MongoUserRoleModelFields = MongoModelFields & UserRoleFields

class UserRole extends Model {
  private constructor(
    id: string,
    createdAt: Date,
    modifiedAt: Date,
    public readonly name: string,
    public readonly permissions: Permissions,
  ) {
    super(id, createdAt, modifiedAt)
  }

  public static fromMongo(doc: MongoUserRoleModelFields): UserRole {
    return new UserRole(doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.permissions)
  }

  public toGraphQLType(): UserRoleType {
    return new UserRoleType(this)
  }
}

export const defaultUserRoles: UserRoleFields[] = []

export default UserRole
