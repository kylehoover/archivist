import { Container, Service } from 'typedi'

import { CampaignService, ServiceProvider, UserService } from '../services'
import MongoCampaignService from './MongoCampaignService'
import MongoUserService from './MongoUserService'
import MongoDb from './MongoDb'

@Service()
class MongoServiceProvider implements ServiceProvider {
  constructor(private readonly db: MongoDb) {}

  public async init(): Promise<void> {
    await this.db.init()
  }

  public getCampaignService(): CampaignService {
    return Container.get(MongoCampaignService)
  }

  public getUserService(): UserService {
    return Container.get(MongoUserService)
  }
}

export default MongoServiceProvider
