import Model from './Model'

export enum PermissionName {
  CanApproveUserRegistrationRequests = 'canApproveUserRegistrationRequests',
  CanEditAppSettings = 'canEditAppSettings',
  CanEditUserRoles = 'canEditUserRoles',
  CanInviteUsers = 'canInviteUsers',
}

export type Permissions = {
  [name in PermissionName]: boolean
}

class UserRole extends Model {

}

export default UserRole
