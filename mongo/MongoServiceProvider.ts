import { IServiceProvider } from '../services'
import { ICampaignService } from '../services'
import MongoCampaignService from './MongoCampaignService'

class MongoServiceProvider implements IServiceProvider {
  public getCampaignService(): ICampaignService {
    return new MongoCampaignService()
  }
}

export default MongoServiceProvider
