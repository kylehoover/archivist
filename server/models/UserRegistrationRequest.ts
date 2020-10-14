import { DateFields, MFields, Model, ModifiedAt } from './Model'
import { UserRegistrationRequestType } from '../graphql/types'

export interface UserRegistrationRequestFields {
  name: string
  email: string
  password: string
}

export interface UserRegistrationRequestModelFields extends UserRegistrationRequestFields, MFields {}
export interface NewUserRegistrationRequestFields extends UserRegistrationRequestFields, DateFields {}
export interface UpdatedUserRegistrationRequestFields extends
  Partial<UserRegistrationRequestFields>, ModifiedAt {}

export class UserRegistrationRequest extends Model {
  public readonly name: string
  public readonly email: string
  private readonly password: string

  constructor(fields: UserRegistrationRequestModelFields) {
    super(fields.id, fields.createdAt, fields.modifiedAt)
    this.name = fields.name
    this.email = fields.email
    this.password = fields.password
  }

  public toGraphQLType(): UserRegistrationRequestType {
    return new UserRegistrationRequestType(this)
  }
}
