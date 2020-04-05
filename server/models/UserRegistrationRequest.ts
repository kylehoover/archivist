import Model, { MongoModelFields, NewModelFields } from './Model'
import { UserRegistrationRequestType } from '../graphql/types'

export type UserRegistrationRequestFields = {
  name: string
  email: string
  password: string
}

export type NewUserRegistrationRequestModelFields = NewModelFields & UserRegistrationRequestFields

type MongoUserRegistrationRequestModelFields = MongoModelFields & UserRegistrationRequestFields

class UserRegistrationRequest extends Model {
  private constructor(
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
