import DataService from './DataService'
import User, { NewUserModelFields, UpdatedUserModelFields } from '../models/User'

interface UserService extends DataService<User, NewUserModelFields, UpdatedUserModelFields> {
  findByEmail(email: string): Promise<User | null>
  findByRefreshToken(refreshToken: string): Promise<User | null>
}

export default UserService
