import { Container, Service } from 'typedi'

import { CampaignService, ServiceProvider, UserService } from '../services'
import MongoCampaignService from './MongoCampaignService'
import MongoDB from './MongoDB'

@Service()
class MongoServiceProvider implements ServiceProvider {
  constructor(private readonly db: MongoDB) {}

  public async init(): Promise<void> {
    await this.db.init()
  }

  public getCampaignService(): CampaignService {
    return Container.get(MongoCampaignService)
  }

  public getUserService(): UserService {
    throw new Error('Not implemented')
  }
}

export default MongoServiceProvider
