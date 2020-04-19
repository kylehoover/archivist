import 'reflect-metadata'

import { ObjectId } from 'mongodb'

import Campaign, { CampaignFields, MongoCampaignModelFields } from '../../models/Campaign'
import MongoCampaignService from '../MongoCampaignService'
import MongoDb from '../MongoDb'
import { Model } from '../../models'

const db = new MongoDb()
const campaignService = new MongoCampaignService(db)
let initialCampaigns: Campaign[] = []
const data: CampaignFields[] = []

for (let i = 0; i < 5; i++) {
  data.push({ name: `Name ${i}` })
}

beforeAll(async () => {
  await db.initForTesting()
})

afterAll(async () => {
  await db.close()
})

beforeEach(async () => {
  const result = await db.campaigns.insertMany(data.map(campaign => Model.getNewModelFields(campaign)))
  initialCampaigns = result.ops.map(Campaign.fromMongo)
})

afterEach(async () => {
  await db.campaigns.deleteMany({})
})

describe('MongoCampaignService', () => {
  test('deleteById removes a document from the campaigns collection', async () => {
    const id = initialCampaigns[0].id
    const campaign = await campaignService.deleteById(id)
    const campaigns = await db.campaigns.find().map(Campaign.fromMongo).toArray()
    const deletedCampaign = campaigns.find(setting => setting.id === id)
    expect(campaign).toEqual(initialCampaigns[0])
    expect(deletedCampaign).toBeUndefined()
    expect(campaigns).toEqual(initialCampaigns.filter(as => as.id !== id))
  })

  test('findAll returns all documents in the campaigns collection', async () => {
    const campaigns = await campaignService.findAll()
    expect(campaigns).toEqual(initialCampaigns)
  })

  test('findById returns a Campaign object if the id exists', async () => {
    const campaign = await campaignService.findById(initialCampaigns[0].id)
    expect(campaign).toEqual(initialCampaigns[0])
  })

  test('findById returns null if the id does not exist', async () => {
    const campaign = await campaignService.findById((new ObjectId()).toHexString())
    expect(campaign).toBeNull()
  })

  test('insertOne adds a new document to the campaigns collection', async () => {
    const campaignFields = Model.getNewModelFields({ name: 'New Campaign' })
    const campaign = await campaignService.insertOne(campaignFields)
    const fieldsAsModel = Campaign.fromMongo(campaignFields as MongoCampaignModelFields)
    const campaigns = await db.campaigns.find().map(Campaign.fromMongo).toArray()
    const insertedCampaign = campaigns.find(as => as.id === fieldsAsModel.id)
    expect(campaign).toEqual(fieldsAsModel)
    expect(insertedCampaign).toEqual(fieldsAsModel)
    expect(campaigns).toEqual([...initialCampaigns, fieldsAsModel])
  })

  test('updateById updates a document in the campaigns collection', async () => {
    const campaign = initialCampaigns[0]
    const updatedFields = Model.getUpdatedModelFields({ name: 'Updated Name' })
    const updatedCampaign = await campaignService.updateById(campaign.id, updatedFields)
    const campaigns = await db.campaigns.find().map(Campaign.fromMongo).toArray()
    const updatedCampaignFromDb = campaigns.find(as => as.id === campaign.id)
    const updatedInitialCampaigns = initialCampaigns.map(as => as.id === campaign.id ? updatedCampaign : as)
    expect(updatedCampaign.id).toEqual(campaign.id)
    expect(updatedCampaign.createdAt).toEqual(campaign.createdAt)
    expect(updatedCampaign.modifiedAt).toEqual(updatedFields.modifiedAt)
    expect(updatedCampaign.name).toEqual(updatedFields.name)
    expect(updatedCampaignFromDb).toEqual(updatedCampaign)
    expect(campaigns).toEqual(updatedInitialCampaigns)
  })
})
