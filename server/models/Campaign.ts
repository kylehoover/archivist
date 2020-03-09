import Model, { MongoModelFields, NewModelFields } from './Model'
import { CampaignType } from '../graphql/types'

export type CampaignFields = {
  name: string
}

export type NewCampaignModelFields = NewModelFields & CampaignFields

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
