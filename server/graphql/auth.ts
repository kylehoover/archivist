import { EmailAlreadyInUseError } from './errors'
import { PermissionName } from '../models'
import { UserService } from '../services'
import { isEmailAvailable } from '../helpers/auth'

export const {
  CanApproveUserRegistrationRequests,
  CanEditAppSettings,
  CanEditUserRoles,
  CanInviteUsers,
} = PermissionName

export async function validateEmailIsAvailable(email: string, userService: UserService): Promise<void> {
  if (!(await isEmailAvailable(email, userService))) {
    throw new EmailAlreadyInUseError()
  }
}
