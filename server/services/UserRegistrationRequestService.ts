import DataService from './DataService'
import UserRegistrationRequest, {
  NewUserRegistrationRequestModelFields,
  UpdatedUserRegistrationRequestModelFields,
} from '../models/UserRegistrationRequest'

interface UserRegistrationRequestService extends DataService<
  UserRegistrationRequest,
  NewUserRegistrationRequestModelFields,
  UpdatedUserRegistrationRequestModelFields
> {}

export default UserRegistrationRequestService
