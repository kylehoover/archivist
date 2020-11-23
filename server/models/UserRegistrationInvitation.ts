import { Model, ModelFields } from './Model'
import { UserRegistrationInvitationType } from '../graphql/types'
import { DateFields, ModifiedAt } from './types'

export interface UserRegistrationInvitationFields {
  email: string
  invitationId: string
  invitedByUserId: string
  expiresAt: Date
}

export interface UserRegistrationInvitationModelFields extends UserRegistrationInvitationFields, ModelFields {}
export interface NewUserRegistrationInvitationFields extends UserRegistrationInvitationFields, DateFields {}
export interface UpdatedUserRegistrationInvitationFields extends
  Partial<UserRegistrationInvitationFields>, ModifiedAt {}

export class UserRegistrationInvitation extends Model {
  public readonly email: string
  public readonly invitationId: string
  public readonly invitedByUserId: string
  public readonly expiresAt: Date

  constructor(fields: UserRegistrationInvitationModelFields) {
    super(fields)
    this.email = fields.email
    this.invitationId = fields.invitationId
    this.invitedByUserId = fields.invitedByUserId
    this.expiresAt = fields.expiresAt
  }

  public toGraphQLType(): UserRegistrationInvitationType {
    return new UserRegistrationInvitationType(this)
  }
}
