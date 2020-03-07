import { Container, Service } from 'typedi'

import MongoAppSettingService from './MongoAppSettingService'
import MongoCampaignService from './MongoCampaignService'
import MongoDb from './MongoDb'
import MongoUserService from './MongoUserService'
import { ServiceProvider } from '../services'

@Service()
class MongoServiceProvider implements ServiceProvider {
  constructor(private readonly db: MongoDb) {}

  public async init(): Promise<void> {
    await this.db.init()
  }

  public getAppSettingService(): MongoAppSettingService {
    return Container.get(MongoAppSettingService)
  }

  public getCampaignService(): MongoCampaignService {
    return Container.get(MongoCampaignService)
  }

  public getUserService(): MongoUserService {
    return Container.get(MongoUserService)
  }
}

export default MongoServiceProvider
