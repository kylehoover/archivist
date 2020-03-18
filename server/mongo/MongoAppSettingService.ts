import { MongoError, ObjectId } from 'mongodb'
import { Service } from 'typedi'

import MongoDb from './MongoDb'
import AppSetting, { NewAppSettingModelFields, UpdatedAppSettingModelFields } from '../models/AppSetting'
import { AppSettingService } from '../services'

@Service()
class MongoAppSettingService implements AppSettingService {
  constructor(private readonly db: MongoDb) {}

  public findAll(): Promise<AppSetting[]> {
    return MongoDb.findAll(this.db.appSettings, AppSetting.fromMongo)
  }

  public findById(id: string): Promise<AppSetting | null> {
    return MongoDb.findById(id, this.db.appSettings, AppSetting.fromMongo)
  }

  public insertOne(fields: NewAppSettingModelFields): Promise<AppSetting> {
    return MongoDb.insertOne(fields, this.db.appSettings, AppSetting.fromMongo)
  }

  public async updateById(
    id: string,
    fields: UpdatedAppSettingModelFields,
    options?: {
      returnOriginal: false
      upsert: false
    },
  ): Promise<AppSetting> {
    const result = await this.db.appSettings.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: fields },
      options
    )

    if (result.ok) {
      return AppSetting.fromMongo(result.value)
    }

    throw new MongoError('MongoDB Error: Failed to update document')
  }
}

export default MongoAppSettingService
