import Model, { MongoModelFields, NewModelFields } from './Model'
import { UserType } from '../graphql/types/'

export type UserFields = {
  name: string
  email: string
  password: string
}

export type NewUserModelFields = NewModelFields & UserFields

type MongoUserModelFields = MongoModelFields & UserFields

class User extends Model {
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

  public static fromMongo(doc: MongoUserModelFields): User {
    return new User(doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.email, doc.password)
  }

  public toGraphQLType(): UserType {
    return new UserType(this)
  }
}

export default User
