import 'reflect-metadata'

import Campaign, { MongoCampaignModelFields } from '../Campaign'
import { CampaignType } from '../../graphql/types'

describe('Campaign', () => {
  test('fromMongo returns a new Campaign object', () => {
    const doc: MongoCampaignModelFields = {
      _id: '1',
      createdAt: new Date(),
      modifiedAt: new Date(),
      name: 'Campaign Name',
    }
    const campaign = new Campaign(doc._id, doc.createdAt, doc.modifiedAt, doc.name)
    expect(Campaign.fromMongo(doc)).toEqual(campaign)
  })

  test('toGraphQLType converts a Campaign into a CampaignType', () => {
    const campaign = new Campaign('1', new Date(), new Date(), 'Campaign Name')
    const campaignType = new CampaignType(campaign)
    expect(campaign.toGraphQLType()).toEqual(campaignType)
  })
})
