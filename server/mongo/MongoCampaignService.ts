import { ObjectId } from 'mongodb'
import { Service } from 'typedi'

import MongoDB from './MongoDB'
import { Campaign } from '../models'
import { CampaignService } from '../services'

@Service()
class MongoCampaignService implements CampaignService {
  constructor(private readonly db: MongoDB) {}

  public async findAll(): Promise<Campaign[]> {
    const docs = await this.db.campaigns.find().toArray()
    return docs.map(Campaign.fromMongoDocument)
  }

  public async findById(id: string): Promise<Campaign | null> {
    const doc = await this.db.campaigns.findOne({ _id: new ObjectId(id) })
    return Campaign.fromMongoDocument(doc)
  }
}

export default MongoCampaignService
