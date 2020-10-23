import Joi from 'joi'
import { Service } from 'typedi'
import { MongoDb, deleteById, findAll, findById, insertOne, updateById } from './MongoDb'
import { Campaign, CampaignModelFields, NewCampaignFields, UpdatedCampaignFields } from '../models'
import { CampaignService } from '../services'
import { docToFields, modelSchema } from './helpers'

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

  public async findAll(): Promise<Campaign[]> {
    const docs = await findAll<CampaignModelFields>(this.db.campaigns, campaignSchema)
    return docs.map(fields => new Campaign(fields))
  }

  public async findAllByUserId(userId: string): Promise<Campaign[]> {
    const docs = await this.db.campaigns.find<CampaignModelFields>({ userId }).toArray()
    return docs.map(doc => new Campaign(docToFields(doc, campaignSchema)))
  }

  public async findById(id: string): Promise<Campaign | null> {
    const doc = await findById<CampaignModelFields>(id, this.db.campaigns, campaignSchema)
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
