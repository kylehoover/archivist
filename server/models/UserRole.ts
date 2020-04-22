import Model, { MongoModelFields, NewModelFields, UpdatedModelFields } from './Model'
import { UserRoleType } from '../graphql/types'

export enum PermissionName {
  CanApproveUserRegistrationRequests = 'canApproveUserRegistrationRequests',
  CanEditAppSettings = 'canEditAppSettings',
  CanEditUserRoles = 'canEditUserRoles',
  CanInviteUsers = 'canInviteUsers',
}

export type UserRoleFields = {
  name: string
  isDefault: boolean
  isReadonly: boolean
  permissions: Permissions
}

export type UserRolesMap = {
  [key: string]: UserRole
}

export type MongoUserRoleModelFields = MongoModelFields & UserRoleFields
export type NewUserRoleModelFields = NewModelFields & UserRoleFields
export type UpdatedUserRoleModelFields = UpdatedModelFields & Partial<UserRoleFields>

type Permissions = {
  [name in PermissionName]: boolean
}

class UserRole extends Model {
  constructor(
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

  public static getDefaultRoleFromList(userRoles: UserRole[]): UserRole {
    const defaultRoles = userRoles.filter(role => role.isDefault)

    if (defaultRoles.length === 0) {
      throw new Error('Data Integrity Error: There is no default UserRole')
    }

    if (defaultRoles.length > 1) {
      throw new Error('Data Integrity Error: There is more than one default UserRole')
    }

    return defaultRoles[0]
  }

  public static listToMap(userRoles: UserRole[]): UserRolesMap {
    return userRoles.reduce((map, role) => ({
      ...map,
      [role.id]: role,
    }), {})
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
      canApproveUserRegistrationRequests: true,
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
      canApproveUserRegistrationRequests: false,
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
      canApproveUserRegistrationRequests: true,
      canEditAppSettings: true,
      canEditUserRoles: true,
      canInviteUsers: true,
    },
  },
]

export default UserRole
