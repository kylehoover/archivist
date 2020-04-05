import DataService from './DataService'
import UserRegistrationRequest, { NewUserRegistrationRequestModelFields } from '../models/UserRegistrationRequest'

interface UserRegistrationRequestService extends
  DataService<UserRegistrationRequest, NewUserRegistrationRequestModelFields> {}

export default UserRegistrationRequestService
