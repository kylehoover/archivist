import DataService from './DataService'
import UserRole, { NewUserRoleModelFields, UpdatedUserRoleModelFields } from '../models/UserRole'

interface UserRoleService extends DataService<UserRole, NewUserRoleModelFields> {
  findDefaultRole(): Promise<UserRole | null>
  updateById(
    id: string,
    fields: UpdatedUserRoleModelFields,
    options?: {
      returnOriginal: false
      upsert: false
    },
  ): Promise<UserRole>
}

export default UserRoleService
