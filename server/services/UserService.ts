import DataService from './DataService'
import { User } from '../models'

interface UserService extends DataService<User> {}

export default UserService
