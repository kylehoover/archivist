import { DataService } from './DataService'
import {
  NewUserRegistrationRequestFields,
  UpdatedUserRegistrationRequestFields,
  UserRegistrationRequest,
} from '../models/UserRegistrationRequest'

export interface UserRegistrationRequestService extends DataService<
  UserRegistrationRequest,
  NewUserRegistrationRequestFields,
  UpdatedUserRegistrationRequestFields,
  {}
> {}
