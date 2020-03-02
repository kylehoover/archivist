import { Service } from 'typedi'

import MongoDb from './MongoDb'
import { Campaign } from '../models'
import { CampaignService } from '../services'

@Service()
class MongoCampaignService implements CampaignService {
  constructor(private readonly db: MongoDb) {}

  public findAll(): Promise<Campaign[]> {
    return MongoDb.findAll(this.db.campaigns, Campaign.fromMongo)
  }

  public async findById(id: string): Promise<Campaign | null> {
    return MongoDb.findById(id, this.db.campaigns, Campaign.fromMongo)
  }
}

export default MongoCampaignService
