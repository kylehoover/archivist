import Model from './Model'
import { MongoDocument } from '../mongo'
import { UserType } from '../graphql/types/'

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

  public static fromMongo(doc: MongoDocument): User {
    return new User(doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.email, doc.password)
  }

  public toGraphQLType(): UserType {
    return new UserType(this)
  }
}

export default User
