import Joi from 'joi'
import { Service } from 'typedi'
import { AppSetting, AppSettingModelFields, NewAppSettingFields, UpdateAppSettingFields } from '../models/AppSetting'
import { AppSettingService } from '../services'
import { MongoDb, deleteById, findAll, findById, insertOne, updateById } from './MongoDb'
import { modelSchema } from './helpers'

const appSettingSchema = modelSchema.keys({
  name: Joi.string().valid('numDaysInvitationIsValid', 'userRegistrationState').required(),
  value: Joi.alternatives().try(Joi.boolean(), Joi.number(), Joi.string()).required(),
  displayName: Joi.string().required(),
  description: Joi.string().required(),
})

@Service()
export class MongoAppSettingService implements AppSettingService {
  constructor(private readonly db: MongoDb) {}

  public async deleteById(id: string): Promise<AppSetting> {
    const doc = await deleteById<AppSettingModelFields>(id, this.db.appSettings, appSettingSchema)
    return new AppSetting(doc)
  }

  public async findAll(): Promise<AppSetting[]> {
    const docs = await findAll<AppSettingModelFields>(this.db.appSettings, appSettingSchema)
    return docs.map(fields => new AppSetting(fields))
  }

  public async findById(id: string): Promise<AppSetting | null> {
    const doc = await findById<AppSettingModelFields>(id, this.db.appSettings, appSettingSchema)
    return doc === null ? null : new AppSetting(doc)
  }

  public async insertOne(fields: NewAppSettingFields): Promise<AppSetting> {
    const doc = await insertOne<AppSettingModelFields>(fields, this.db.appSettings, appSettingSchema)
    return new AppSetting(doc)
  }

  public async updateById(id: string, fields: UpdateAppSettingFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<AppSetting> {
    const doc = await updateById<AppSettingModelFields>(
      id,
      fields,
      this.db.appSettings,
      appSettingSchema,
      options
    )
    return new AppSetting(doc)
  }
}
