import { DataService } from './DataService'
import UserRegistrationInvitation, {
  NewUserRegistrationInvitationModelFields,
  UpdatedUserRegistrationInvitationModelFields,
} from '../models/UserRegistrationInvitation'

interface UserRegistrationInvitationService extends DataService<
  UserRegistrationInvitation,
  NewUserRegistrationInvitationModelFields,
  UpdatedUserRegistrationInvitationModelFields
> {}

export default UserRegistrationInvitationService
