import DataService from './DataService'
import UserRole, { NewUserRoleModelFields } from '../models/UserRole'

interface UserRoleService extends DataService<UserRole, NewUserRoleModelFields> {
  findDefaultRole(): Promise<UserRole | null>
}

export default UserRoleService
