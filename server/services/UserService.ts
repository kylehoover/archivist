import DataService from './DataService'
import User, { NewUserModelFields } from '../models/User'

interface UserService extends DataService<User, NewUserModelFields> {}

export default UserService
