import { DataService } from './DataService'
import { NewUserRoleFields, UpdatedUserRoleFields, UserRole } from '../models/UserRole'

export interface UserRoleService extends DataService<
  UserRole,
  NewUserRoleFields,
  UpdatedUserRoleFields,
  {}
> {
  findByName(name: string): Promise<UserRole | null>
  findDefaultRole(): Promise<UserRole>
}
