import { Model } from './Model'
import { PermissionType } from '../graphql'

export enum PermissionName {
  CanApproveUserRegistrationRequests = 'canApproveUserRegistrationRequests',
  CanEditAppSettings = 'canEditAppSettings',
  CanEditUserRoles = 'canEditUserRoles',
  CanInviteUsers = 'canInviteUsers',
}

export type Permissions = {
  [name in PermissionName]: boolean
}

export function getPermissionsFromGraphQLType(data: PermissionType[]): Permissions {
  return data.reduce((accumulator, permission) => ({
    ...accumulator,
    [permission.name]: permission.value,
  }), {} as Permissions)
}

export class UserRole extends Model {}
