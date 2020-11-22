import bcrypt from 'bcrypt'
import { DataProvider } from '../DataProvider'
import { DateFields, Model, ModelFields, ModifiedAt } from './Model'
import { UserRole } from './UserRole'
import { AccessTokenPayload } from '../helpers/auth'
import { Permissions } from './UserRole'
import { UserType } from '../graphql/types/'

export enum RegistrationType {
  OpenRegistration = 'openRegistration',
  Invitation = 'invitation',
  Request = 'request',
  Superuser = 'superuser',
}

export interface RequestUserInfo extends AccessTokenPayload {
  permissions: Permissions
}

export interface RegistrationInfo {
  approvedByUserId?: string
  invitedByUserId?: string
  type: RegistrationType
}

export interface UserFields {
  name: string
  email: string
  roleId: string
  password: string
  refreshToken?: string
  registration: RegistrationInfo
}

export interface UserModelFields extends UserFields, ModelFields {}
export interface NewUserFields extends UserFields, DateFields {}
export interface UpdatedUserFields extends Partial<UserFields>, ModifiedAt {}

export class User extends Model {
  public readonly name: string
  public readonly email: string
  public readonly roleId: string
  public readonly registration: RegistrationInfo
  private readonly password: string
  private readonly refreshToken?: string

  constructor(fields: UserModelFields) {
    super(fields)
    this.name = fields.name
    this.email = fields.email
    this.roleId = fields.roleId
    this.registration = fields.registration
    this.password = fields.password
    this.refreshToken = fields.refreshToken
  }

  public get role(): UserRole {
    return DataProvider.getUserRoleById(this.roleId)
  }

  public passwordMatches(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
  }

  public toGraphQLType(): UserType {
    return new UserType(this)
  }
}
