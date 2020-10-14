import { DateFields, MFields, Model, ModifiedAt } from './Model'
import { UserRegistrationInvitationType } from '../graphql/types'

export interface UserRegistrationInvitationFields {
  email: string
  invitationId: string
  invitedByUserId: string
  expiresAt: Date
}

export interface UserRegistrationInvitationModelFields extends UserRegistrationInvitationFields, MFields {}
export interface NewUserRegistrationInvitationFields extends UserRegistrationInvitationFields, DateFields {}
export interface UpdatedUserRegistrationInvitationFields extends
  Partial<UserRegistrationInvitationFields>, ModifiedAt {}

export class UserRegistrationInvitation extends Model {
  public readonly email: string
  public readonly invitationId: string
  public readonly invitedByUserId: string
  public readonly expiresAt: Date

  constructor(fields: UserRegistrationInvitationModelFields) {
    super(fields.id, fields.createdAt, fields.modifiedAt)
    this.email = fields.email
    this.invitationId = fields.invitationId
    this.invitedByUserId = fields.invitedByUserId
    this.expiresAt = fields.expiresAt
  }

  public toGraphQLType(): UserRegistrationInvitationType {
    return new UserRegistrationInvitationType(this)
  }
}
