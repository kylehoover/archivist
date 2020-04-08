import DataService from './DataService'
import User, { NewUserModelFields, UpdatedUserModelFields } from '../models/User'

interface UserService extends DataService<User, NewUserModelFields, UpdatedUserModelFields> {}

export default UserService
