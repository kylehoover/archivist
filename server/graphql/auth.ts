import { PermissionName } from '../models/UserRole'

import { EmailAlreadyInUseError } from './errors'
import { UserService } from '../services'
import { isEmailAvailable } from '../helpers/auth'

export const CanApproveUserRegistrationRequests = PermissionName.CanApproveUserRegistrationRequests
export const CanEditAppSettings = PermissionName.CanEditAppSettings
export const CanEditUserRoles = PermissionName.CanEditUserRoles
export const CanInviteUsers = PermissionName.CanInviteUsers

export async function validateEmailIsAvailable(email: string, userService: UserService): Promise<void> {
  if (!(await isEmailAvailable(email, userService))) {
    throw new EmailAlreadyInUseError()
  }
}
