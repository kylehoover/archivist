import { Service } from 'typedi'

import Campaign, { CampaignFields } from '../models/Campaign'
import MongoDb from './MongoDb'
import { CampaignService } from '../services'

@Service()
class MongoCampaignService implements CampaignService {
  constructor(private readonly db: MongoDb) {}

  public findAll(): Promise<Campaign[]> {
    return MongoDb.findAll(this.db.campaigns, Campaign.fromMongo)
  }

  public findById(id: string): Promise<Campaign | null> {
    return MongoDb.findById(id, this.db.campaigns, Campaign.fromMongo)
  }

  public insertOne(fields: CampaignFields): Promise<Campaign> {
    return MongoDb.insertOne(
      Campaign.getNewCampaignModelFields(fields),
      this.db.campaigns,
      Campaign.fromMongo,
    )
  }
}

export default MongoCampaignService
