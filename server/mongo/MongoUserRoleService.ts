import Joi from 'joi'
import { Service } from 'typedi'
import { MongoDb, deleteById, findAll, findById, insertOne, updateById } from './MongoDb'
import { UserRoleService } from '../services'
import { docToFields, findOneOrThrow, modelSchema } from './helpers'
import {
  NewUserRoleFields,
  UpdatedUserRoleFields,
  UserRole,
  UserRoleFields,
  UserRoleModelFields,
} from '../models/UserRole'

const userRoleSchema = modelSchema.keys({
  name: Joi.string().required(),
  isDefault: Joi.boolean().required(),
  isReadonly: Joi.boolean().required(),
  permissions: Joi.object({
    canApproveUserRegistrationRequests: Joi.boolean().required(),
    canEditAppSettings: Joi.boolean().required(),
    canEditUserRoles: Joi.boolean().required(),
    canInviteUsers: Joi.boolean().required(),
  }).required(),
})

@Service()
export class MongoUserRoleService implements UserRoleService {
  constructor(private readonly db: MongoDb) {}

  public async deleteById(id: string): Promise<UserRole> {
    const doc = await deleteById<UserRoleModelFields>(id, this.db.userRoles, userRoleSchema)
    return new UserRole(doc)
  }

  public async findAll(filterBy?: Partial<UserRoleFields>): Promise<UserRole[]> {
    const docs = await findAll<UserRoleModelFields, UserRoleFields>(
      this.db.userRoles,
      userRoleSchema,
      filterBy,
    )
    return docs.map(fields => new UserRole(fields))
  }

  public async findById(id: string): Promise<UserRole | null> {
    const doc = await findById<UserRoleModelFields>(id, this.db.userRoles, userRoleSchema)
    return this.userRoleOrNull(doc)
  }

  public async findByName(name: string): Promise<UserRole | null> {
    const userRoles = await this.findAll({ name })
    return findOneOrThrow(userRoles, 'Found more than one user role with the same name')
  }

  public async findDefaultRole(): Promise<UserRole> {
    const userRoles = await this.findAll({ isDefault: true })
    return UserRole.getDefaultRoleFromList(userRoles)
  }

  public async insertOne(fields: NewUserRoleFields): Promise<UserRole> {
    const doc = await insertOne<UserRoleModelFields>(fields, this.db.userRoles, userRoleSchema)
    return new UserRole(doc)
  }

  public async updateById(id: string, fields: UpdatedUserRoleFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<UserRole> {
    const doc = await updateById<UserRoleModelFields>(id, fields, this.db.userRoles, userRoleSchema, options)
    return new UserRole(doc)
  }

  private userRoleOrNull(doc: UserRoleModelFields | null): UserRole | null {
    return doc === null ? null : new UserRole(docToFields(doc, userRoleSchema))
  }
}
