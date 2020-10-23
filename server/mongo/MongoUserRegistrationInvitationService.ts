import Joi from 'joi'
import { Service } from 'typedi'
import { MongoDb, deleteById, findAll, findById, insertOne, updateById } from './MongoDb'
import { UserRegistrationInvitationService } from '../services'
import { modelSchema } from './helpers'
import {
  NewUserRegistrationInvitationFields,
  UpdatedUserRegistrationInvitationFields,
  UserRegistrationInvitation,
  UserRegistrationInvitationModelFields,
} from '../models/UserRegistrationInvitation'

const userRegistrationInvitationSchema = modelSchema.keys({
  email: Joi.string().required(),
  invitationId: Joi.string().required(),
  invitedByUserId: Joi.string().required(),
  expiresAt: Joi.date().required(),
})

@Service()
export class MongoUserRegistrationInvitationService implements UserRegistrationInvitationService {
  constructor(private readonly db: MongoDb) {}

  public async deleteById(id: string): Promise<UserRegistrationInvitation> {
    const doc = await deleteById<UserRegistrationInvitationModelFields>(
      id,
      this.db.userRegistrationInvitations,
      userRegistrationInvitationSchema
    )
    return new UserRegistrationInvitation(doc)
  }

  public async findAll(): Promise<UserRegistrationInvitation[]> {
    const docs = await findAll<UserRegistrationInvitationModelFields>(
      this.db.userRegistrationInvitations,
      userRegistrationInvitationSchema
    )
    return docs.map(fields => new UserRegistrationInvitation(fields))
  }

  public async findById(id: string): Promise<UserRegistrationInvitation | null> {
    const doc = await findById<UserRegistrationInvitationModelFields>(
      id,
      this.db.userRegistrationInvitations,
      userRegistrationInvitationSchema
    )
    return doc === null ? null : new UserRegistrationInvitation(doc)
  }

  public async insertOne(fields: NewUserRegistrationInvitationFields): Promise<UserRegistrationInvitation> {
    const doc = await insertOne<UserRegistrationInvitationModelFields>(
      fields,
      this.db.userRegistrationInvitations,
      userRegistrationInvitationSchema
    )
    return new UserRegistrationInvitation(doc)
  }

  public async updateById(id: string, fields: UpdatedUserRegistrationInvitationFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<UserRegistrationInvitation> {
    const doc = await updateById<UserRegistrationInvitationModelFields>(
      id,
      fields,
      this.db.userRegistrationInvitations,
      userRegistrationInvitationSchema,
      options
    )
    return new UserRegistrationInvitation(doc)
  }
}
