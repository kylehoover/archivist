import { DataService } from './DataService'
import {
  NewUserRegistrationInvitationFields,
  UpdatedUserRegistrationInvitationFields,
  UserRegistrationInvitation,
} from '../models/UserRegistrationInvitation'

export interface UserRegistrationInvitationService extends DataService<
  UserRegistrationInvitation,
  NewUserRegistrationInvitationFields,
  UpdatedUserRegistrationInvitationFields,
  {}
> {}
