import Model, { MongoModelFields, NewModelFields, UpdatedModelFields } from './Model'
import { CampaignType } from '../graphql/types'

export type CampaignFields = {
  name: string
}

export type NewCampaignModelFields = NewModelFields & CampaignFields
export type UpdatedCampaignModelFields = UpdatedModelFields & Partial<CampaignFields>

type MongoCampaignModelFields = MongoModelFields & CampaignFields

class Campaign extends Model {
  private constructor(
    id: string,
    createdAt: Date,
    modifiedAt: Date,
    public readonly name: string,
  ) {
    super(id, createdAt, modifiedAt)
  }

  public static fromMongo(doc: MongoCampaignModelFields): Campaign {
    return new Campaign(doc._id, doc.createdAt, doc.modifiedAt, doc.name)
  }

  public toGraphQLType(): CampaignType {
    return new CampaignType(this)
  }
}

export default Campaign
