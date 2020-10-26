import { DataService } from './DataService'
import { NewUserFields, UpdatedUserFields, User } from '../models/User'

export interface UserService extends DataService<
  User,
  NewUserFields,
  UpdatedUserFields,
  {}
> {
  findByEmail(email: string): Promise<User | null>
  findByRefreshToken(refreshToken: string): Promise<User | null>
}
