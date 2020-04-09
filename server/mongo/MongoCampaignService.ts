import { Service } from 'typedi'

import Campaign, { NewCampaignModelFields, UpdatedCampaignModelFields } from '../models/Campaign'
import MongoDb from './MongoDb'
import { CampaignService } from '../services'

@Service()
class MongoCampaignService implements CampaignService {
  constructor(private readonly db: MongoDb) {}

  public deleteById(id: string): Promise<Campaign> {
    return MongoDb.deleteById(id, this.db.campaigns, Campaign.fromMongo)
  }

  public findAll(): Promise<Campaign[]> {
    return MongoDb.findAll(this.db.campaigns, Campaign.fromMongo)
  }

  public findById(id: string): Promise<Campaign | null> {
    return MongoDb.findById(id, this.db.campaigns, Campaign.fromMongo)
  }

  public insertOne(fields: NewCampaignModelFields): Promise<Campaign> {
    return MongoDb.insertOne(fields, this.db.campaigns, Campaign.fromMongo)
  }

  public async updateById(id: string, fields: UpdatedCampaignModelFields, options?: {
    returnOriginal: false
    upsert: false
  }): Promise<Campaign> {
    return MongoDb.updateById(id, fields, this.db.campaigns, Campaign.fromMongo, options)
  }
}

export default MongoCampaignService
