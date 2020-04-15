import Model, { MongoModelFields, NewModelFields, UpdatedModelFields } from './Model'
import { UserRegistrationRequestType } from '../graphql/types'

export type UserRegistrationRequestFields = {
  name: string
  email: string
  password: string
}

export type MongoUserRegistrationRequestModelFields = MongoModelFields & UserRegistrationRequestFields
export type NewUserRegistrationRequestModelFields = NewModelFields & UserRegistrationRequestFields
export type UpdatedUserRegistrationRequestModelFields = UpdatedModelFields & Partial<UserRegistrationRequestFields>

class UserRegistrationRequest extends Model {
  constructor(
    id: string,
    createdAt: Date,
    modifiedAt: Date,
    public readonly name: string,
    public readonly email: string,
    private readonly password: string,
  ) {
    super(id, createdAt, modifiedAt)
  }

  public static fromMongo(doc: MongoUserRegistrationRequestModelFields): UserRegistrationRequest {
    return new UserRegistrationRequest(doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.email,
      doc.password)
  }

  public toGraphQLType(): UserRegistrationRequestType {
    return new UserRegistrationRequestType(this)
  }
}

export default UserRegistrationRequest
