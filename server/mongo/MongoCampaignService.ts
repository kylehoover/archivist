import Joi from 'joi'
import { Service } from 'typedi'
import { MongoDb, deleteById, findAll, findById, insertOne, updateById } from './MongoDb'
import { CampaignService } from '../services'
import { modelSchema } from './helpers'
import {
  Campaign,
  CampaignFields,
  CampaignModelFields,
  NewCampaignFields,
  UpdatedCampaignFields,
} from '../models'

const campaignSchema = modelSchema.keys({
  name: Joi.string().required(),
  userId: Joi.string().required(),
})

@Service()
export class MongoCampaignService implements CampaignService {
  constructor(private readonly db: MongoDb) {}

  public async deleteById(id: string): Promise<Campaign> {
    const doc = await deleteById<CampaignModelFields>(id, this.db.campaigns, campaignSchema)
    return new Campaign(doc)
  }

  public async findAll(filterBy?: Partial<CampaignFields>): Promise<Campaign[]> {
    const docs = await findAll<CampaignModelFields, CampaignFields>(
      this.db.campaigns,
      campaignSchema,
      filterBy,
    )
    return docs.map(fields => new Campaign(fields))
  }

  public async findById(id: string, filterBy?: Partial<CampaignFields>): Promise<Campaign | null> {
    const doc = await findById<CampaignModelFields, CampaignFields>(
      id,
      this.db.campaigns,
      campaignSchema,
      filterBy,
    )
    return doc === null ? null : new Campaign(doc)
  }

  public async insertOne(fields: NewCampaignFields): Promise<Campaign> {
    const doc = await insertOne<CampaignModelFields>(fields, this.db.campaigns, campaignSchema)
    return new Campaign(doc)
  }

  public async updateById(id: string, fields: UpdatedCampaignFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<Campaign> {
    const doc = await updateById<CampaignModelFields>(id, fields, this.db.campaigns, campaignSchema, options)
    return new Campaign(doc)
  }
}
