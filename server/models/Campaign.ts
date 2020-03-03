import Model from './Model'
import { CampaignType } from '../graphql/types'
import { MongoDocument } from '../mongo/'

class Campaign extends Model {
  private constructor(
    id: string,
    createdAt: Date,
    modifiedAt: Date,
    public readonly name: string,
  ) {
    super(id, createdAt, modifiedAt)
  }

  public static fromMongo(doc: MongoDocument): Campaign {
    return new Campaign(doc._id, doc.createdAt, doc.modifiedAt, doc.name)
  }

  public toGraphQLType(): CampaignType {
    return new CampaignType(this)
  }
}

export default Campaign
