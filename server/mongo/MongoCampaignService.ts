import { ObjectId } from 'mongodb'
import { Service } from 'typedi'

import MongoDB from './MongoDB'
import { Campaign } from '../models'
import { CampaignService } from '../services'

@Service()
class MongoCampaignService implements CampaignService {
  constructor(private readonly db: MongoDB) {}

  public findAll(): Promise<Campaign[]> {
    return MongoDB.findAll(this.db.campaigns, Campaign.fromMongoDocument)
  }

  public async findById(id: string): Promise<Campaign | null> {
    const doc = await this.db.campaigns.findOne({ _id: new ObjectId(id) })
    return doc ? Campaign.fromMongoDocument(doc) : null
  }
}

export default MongoCampaignService
