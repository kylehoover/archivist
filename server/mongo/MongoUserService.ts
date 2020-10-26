import Joi from 'joi'
import { Service } from 'typedi'
import { NewUserFields, UpdatedUserFields, User, UserFields, UserModelFields } from '../models/User'
import { MongoDb, deleteById, findAll, findById, insertOne, updateById } from './MongoDb'
import { UserService } from '../services'
import { findOneOrThrow, modelSchema } from './helpers'

const userSchema = modelSchema.keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  roleId: Joi.string().required(),
  password: Joi.string().required(),
  refreshToken: Joi.string(),
  registration: Joi.object({
    approvedByUserId: Joi.string(),
    invitedByUserId: Joi.string(),
    type: Joi.string().valid('invitation', 'openRegistration', 'request', 'superuser').required(),
  }).required(),
})

@Service()
export class MongoUserService implements UserService {
  constructor(private readonly db: MongoDb) {}

  public async deleteById(id: string): Promise<User> {
    const doc = await deleteById<UserModelFields>(id, this.db.users, userSchema)
    return new User(doc)
  }

  public async findAll(filterBy?: Partial<UserFields>): Promise<User[]> {
    const docs = await findAll<UserModelFields, UserFields>(this.db.users, userSchema, filterBy)
    return docs.map(fields => new User(fields))
  }

  public async findByEmail(email: string): Promise<User | null> {
    const users = await this.findAll({ email })
    return findOneOrThrow(users, 'Found duplicate email')
  }

  public async findById(id: string): Promise<User | null> {
    const doc = await findById<UserModelFields>(id, this.db.users, userSchema)
    return doc === null ? null : new User(doc)
  }

  public async findByRefreshToken(refreshToken: string): Promise<User | null> {
    const users = await this.findAll({ refreshToken })
    return findOneOrThrow(users, 'Found duplicate refresh token')
  }

  public async insertOne(fields: NewUserFields): Promise<User> {
    const doc = await insertOne<UserModelFields>(fields, this.db.users, userSchema)
    return new User(doc)
  }

  public async updateById(id: string, fields: UpdatedUserFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<User> {
    const doc = await updateById<UserModelFields>(id, fields, this.db.users, userSchema, options)
    return new User(doc)
  }
}
