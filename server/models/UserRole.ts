import Model, { MongoModelFields, NewModelFields } from './Model'
import { UserRoleType } from '../graphql/types'

export type UserRoleFields = {
  name: string
  isDefault: boolean
  isReadonly: boolean
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
    public readonly isDefault: boolean,
    public readonly isReadonly: boolean,
    public readonly permissions: Permissions,
  ) {
    super(id, createdAt, modifiedAt)
  }

  public static fromMongo(doc: MongoUserRoleModelFields): UserRole {
    return new UserRole(doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.isDefault,
      doc.isReadonly, doc.permissions)
  }

  public toGraphQLType(): UserRoleType {
    return new UserRoleType(this)
  }
}

export const defaultUserRoles: UserRoleFields[] = [
  {
    name: 'Admin',
    isDefault: false,
    isReadonly: false,
    permissions: {
      canAcceptUserRegistrationRequests: true,
      canEditAppSettings: false,
      canEditUserRoles: false,
      canInviteUsers: true,
    },
  },
  {
    name: 'Regular User',
    isDefault: true,
    isReadonly: false,
    permissions: {
      canAcceptUserRegistrationRequests: false,
      canEditAppSettings: false,
      canEditUserRoles: false,
      canInviteUsers: false,
    },
  },
  {
    name: 'Superuser',
    isDefault: false,
    isReadonly: true,
    permissions: {
      canAcceptUserRegistrationRequests: true,
      canEditAppSettings: true,
      canEditUserRoles: true,
      canInviteUsers: true,
    },
  },
]

export default UserRole
