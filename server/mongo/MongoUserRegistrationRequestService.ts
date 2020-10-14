import Joi from 'joi'
import { Service } from 'typedi'

import { MongoDb, deleteById, findAll, findById, insertOne, updateById } from './MongoDb'
import { UserRegistrationRequestService } from '../services'
import { modelSchema} from './helpers'
import {
  NewUserRegistrationRequestFields,
  UpdatedUserRegistrationRequestFields,
  UserRegistrationRequest,
  UserRegistrationRequestModelFields,
} from '../models/UserRegistrationRequest'

const userRegistrationRequestSchema = modelSchema.keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
})

@Service()
export class MongoUserRegistrationRequestService implements UserRegistrationRequestService {
  constructor(private readonly db: MongoDb) {}

  public async deleteById(id: string): Promise<UserRegistrationRequest> {
    const doc = await deleteById<UserRegistrationRequestModelFields>(
      id,
      this.db.userRegistrationRequests,
      userRegistrationRequestSchema
    )
    return new UserRegistrationRequest(doc)
  }

  public async findAll(): Promise<UserRegistrationRequest[]> {
    const docs = await findAll<UserRegistrationRequestModelFields>(
      this.db.userRegistrationRequests,
      userRegistrationRequestSchema
    )
    return docs.map(fields => new UserRegistrationRequest(fields))
  }

  public async findById(id: string): Promise<UserRegistrationRequest | null> {
    const doc = await findById<UserRegistrationRequestModelFields>(
      id,
      this.db.userRegistrationRequests,
      userRegistrationRequestSchema
    )
    return doc === null ? null : new UserRegistrationRequest(doc)
  }

  public async insertOne(fields: NewUserRegistrationRequestFields): Promise<UserRegistrationRequest> {
    const doc = await insertOne<UserRegistrationRequestModelFields>(
      fields,
      this.db.userRegistrationRequests,
      userRegistrationRequestSchema
    )
    return new UserRegistrationRequest(doc)
  }

  public async updateById(id: string, fields: UpdatedUserRegistrationRequestFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<UserRegistrationRequest> {
    const doc = await updateById<UserRegistrationRequestModelFields>(
      id,
      fields,
      this.db.userRegistrationRequests,
      userRegistrationRequestSchema,
      options
    )
    return new UserRegistrationRequest(doc)
  }
}
