import DataService from './DataService'
import UserRegistrationInvitation, {
  NewUserRegistrationInvitationModelFields,
} from '../models/UserRegistrationInvitation'

interface UserRegistrationInvitationService extends
  DataService<UserRegistrationInvitation, NewUserRegistrationInvitationModelFields> {}

export default UserRegistrationInvitationService
