import Model, { MongoModelFields, NewModelFields, UpdatedModelFields } from './Model'
import { UserRegistrationInvitationType } from '../graphql/types'

export type UserRegistrationInvitationFields = {
  email: string
  invitationId: string
}

export type MongoUserRegistrationInvitationModelFields = MongoModelFields & UserRegistrationInvitationFields
export type NewUserRegistrationInvitationModelFields = NewModelFields & UserRegistrationInvitationFields
export type UpdatedUserRegistrationInvitationModelFields =
  UpdatedModelFields & Partial<UserRegistrationInvitationFields>

class UserRegistrationInvitation extends Model {
  private constructor(
    id: string,
    createdAt: Date,
    modifiedAt: Date,
    public readonly email: string,
    public readonly invitationId: string,
  ) {
    super(id, createdAt, modifiedAt)
  }

  public static fromMongo(doc: MongoUserRegistrationInvitationModelFields): UserRegistrationInvitation {
    return new UserRegistrationInvitation(doc._id, doc.createdAt, doc.modifiedAt, doc.email, doc.invitationId)
  }

  public toGraphQLType(): UserRegistrationInvitationType {
    return new UserRegistrationInvitationType(this)
  }
}

export default UserRegistrationInvitation
