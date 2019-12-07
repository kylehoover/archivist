import { Service } from 'typedi'

import { Campaign } from '../graphql/types'
import { ICampaignService } from '../services'
import MongoDB from './MongoDB'

@Service()
class MongoCampaignService implements ICampaignService {
  constructor(private readonly db: MongoDB) {}

  public async findAll(): Promise<Campaign[]> {
    return this.db.campaigns.find().toArray()
  }
}

export default MongoCampaignService
