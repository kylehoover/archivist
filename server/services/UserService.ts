import { User } from '../graphql/types'
import DataService from './DataService'

interface UserService extends DataService<User> {}

export default UserService
