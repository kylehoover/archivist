import { Container, Service } from 'typedi'

import { ICampaignService, IServiceProvider } from '../services'
import MongoCampaignService from './MongoCampaignService'
import MongoDB from './MongoDB'

@Service()
class MongoServiceProvider implements IServiceProvider {
  constructor(private readonly db: MongoDB) {}

  public async init(): Promise<void> {
    await this.db.init()
  }

  public getCampaignService(): ICampaignService {
    return Container.get(MongoCampaignService)
  }
}

export default MongoServiceProvider
