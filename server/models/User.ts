import DataProvider from '../DataProvider'
import Model, { MongoModelFields, NewModelFields, UpdatedModelFields } from './Model'
import UserRole from './UserRole'
import { UserType } from '../graphql/types/'

export enum RegistrationType {
  OpenRegistration = 'openRegistration',
  Invitation = 'invitation',
  Request = 'request',
  Superuser = 'superuser',
}

export type RegistrationInfo = {
  type: RegistrationType
  invitedByUserId?: string
}

export type UserFields = {
  name: string
  email: string
  roleId: string
  password: string
  registration: RegistrationInfo
}

export type MongoUserModelFields = MongoModelFields & UserFields
export type NewUserModelFields = NewModelFields & UserFields
export type UpdatedUserModelFields = UpdatedModelFields & Partial<UserFields>

class User extends Model {
  constructor(
    id: string,
    createdAt: Date,
    modifiedAt: Date,
    public readonly name: string,
    public readonly email: string,
    public readonly roleId: string,
    private readonly password: string,
    public readonly registration: RegistrationInfo,
  ) {
    super(id, createdAt, modifiedAt)
  }

  public get role(): UserRole {
    return DataProvider.getUserRoleById(this.roleId)
  }

  public static fromMongo(doc: MongoUserModelFields): User {
    return new User(
      doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.email, doc.roleId, doc.password, doc.registration
    )
  }

  public toGraphQLType(): UserType {
    return new UserType(this)
  }
}

export default User
