import { Service } from 'typedi'

import MongoDb from './MongoDb'
import AppSetting, { NewAppSettingModelFields } from '../models/AppSetting'
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
}

export default MongoAppSettingService
