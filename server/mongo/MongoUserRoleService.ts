import Joi from 'joi'
import { Service } from 'typedi'

import { NewUserRoleFields, UpdatedUserRoleFields, UserRole, UserRoleModelFields } from '../models/UserRole'
import { MongoDb, deleteById, findAll, findById, insertOne, updateById } from './MongoDb'
import { UserRoleService } from '../services'
import { docToFields, modelSchema } from './helpers'

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

  public async findAll(): Promise<UserRole[]> {
    const docs = await findAll<UserRoleModelFields>(this.db.userRoles, userRoleSchema)
    return docs.map(fields => new UserRole(fields))
  }

  public async findById(id: string): Promise<UserRole | null> {
    const doc = await findById<UserRoleModelFields>(id, this.db.userRoles, userRoleSchema)
    return this.userRoleOrNull(doc)
  }

  public async findByName(name: string): Promise<UserRole | null> {
    const doc = await this.db.userRoles.findOne<UserRoleModelFields>({ name })
    return this.userRoleOrNull(doc)
  }

  public async findDefaultRole(): Promise<UserRole> {
    const docs = await this.db.userRoles.find<UserRoleModelFields>({ isDefault: true }).toArray()
    const userRoles = docs.map(doc => new UserRole(docToFields(doc, userRoleSchema)))
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
