import { Service } from 'typedi'

import AppSetting, { NewAppSettingModelFields, UpdatedAppSettingModelFields } from '../models/AppSetting'
import { MongoDb } from './MongoDb'
import { AppSettingService } from '../services'

@Service()
class MongoAppSettingService implements AppSettingService {
  constructor(private readonly db: MongoDb) {}

  public deleteById(id: string): Promise<AppSetting> {
    return MongoDb.deleteById(id, this.db.appSettings, AppSetting.fromMongo)
  }

  public findAll(): Promise<AppSetting[]> {
    return MongoDb.findAll(this.db.appSettings, AppSetting.fromMongo)
  }

  public findById(id: string): Promise<AppSetting | null> {
    return MongoDb.findById(id, this.db.appSettings, AppSetting.fromMongo)
  }

  public insertOne(fields: NewAppSettingModelFields): Promise<AppSetting> {
    return MongoDb.insertOne(fields, this.db.appSettings, AppSetting.fromMongo)
  }

  public async updateById(id: string, fields: UpdatedAppSettingModelFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<AppSetting> {
    return MongoDb.updateById(id, fields, this.db.appSettings, AppSetting.fromMongo, options)
  }
}

export default MongoAppSettingService
