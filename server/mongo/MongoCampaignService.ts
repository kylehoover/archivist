import { ObjectId } from 'mongodb'
import { Service } from 'typedi'

import { Campaign } from '../graphql/types'
import { CampaignService } from '../services'
import MongoDB from './MongoDB'

@Service()
class MongoCampaignService implements CampaignService {
  constructor(private readonly db: MongoDB) {}

  public async findAll(): Promise<Campaign[]> {
    return this.db.campaigns.find().toArray()
  }

  public async findById(id: string): Promise<Campaign | null> {
    return this.db.campaigns.findOne({ _id: new ObjectId(id) })
  }
}

export default MongoCampaignService
