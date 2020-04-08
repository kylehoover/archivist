import DataService from './DataService'
import UserRole, { NewUserRoleModelFields, UpdatedUserRoleModelFields } from '../models/UserRole'

interface UserRoleService extends DataService<
  UserRole,
  NewUserRoleModelFields,
  UpdatedUserRoleModelFields
> {
  findDefaultRole(): Promise<UserRole | null>
}

export default UserRoleService
