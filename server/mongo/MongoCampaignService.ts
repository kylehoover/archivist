import Joi from 'joi'
import { Service } from 'typedi'
import { ObjectId } from 'mongodb'

// import Campaign, { NewCampaignModelFields, UpdatedCampaignModelFields } from '../models/Campaign'
import MongoDb from './MongoDb'
import { Campaign, NewCampaignFields, UpdatedCampaignFields } from '../models'
import { CampaignService } from '../services'

const objectIdValidator: Joi.CustomValidator = (value, helpers) => {
  if (!ObjectId.isValid(value)) {
    throw new Error('Invalid ObjectId')
  }

  return value
}

const schema = Joi.object({
  _id: Joi.custom(objectIdValidator).required(),
  createdAt: Joi.date().required(),
  modifiedAt: Joi.date().required(),
  name: Joi.string().required(),
  userId: Joi.string().required(),
})

@Service()
class MongoCampaignService implements CampaignService {
  constructor(private readonly db: MongoDb) {}

  public async deleteById(id: string): Promise<Campaign> {
    return new Campaign({id: '', createdAt: new Date(), modifiedAt: new Date(), name: '', userId: ''})
    // return MongoDb.deleteById(id, this.db.campaigns, Campaign.fromMongo)
  }

  public async findAll(): Promise<Campaign[]> {
    const docs = await this.db.campaigns.find().toArray()

    return docs.map(doc => {
      const { error } = schema.validate(doc)

      if (error !== undefined) {
        throw error
      }

      return doc
    })
    // return MongoDb.findAll(this.db.campaigns, Campaign.fromMongo)
  }

  public async findById(id: string): Promise<Campaign | null> {
    return null
    // return MongoDb.findById(id, this.db.campaigns, Campaign.fromMongo)
  }

  public async insertOne(fields: NewCampaignFields): Promise<Campaign> {
    return new Campaign({id: '', createdAt: new Date(), modifiedAt: new Date(), name: '', userId: ''})
    // return MongoDb.insertOne(fields, this.db.campaigns, Campaign.fromMongo)
  }

  public async updateById(id: string, fields: UpdatedCampaignFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<Campaign> {
    return new Campaign({id: '', createdAt: new Date(), modifiedAt: new Date(), name: '', userId: ''})
    // return MongoDb.updateById(id, fields, this.db.campaigns, Campaign.fromMongo, options)
  }
}

export default MongoCampaignService
