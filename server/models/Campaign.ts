import Model, { MongoModelFields, NewModelFields, UpdatedModelFields } from './Model'
import { CampaignType } from '../graphql/types'

// export type CampaignFields = {
//   name: string
// }

// export type MongoCampaignModelFields = MongoModelFields & CampaignFields
// export type NewCampaignModelFields = NewModelFields & CampaignFields
// export type UpdatedCampaignModelFields = UpdatedModelFields & Partial<CampaignFields>

// class Campaign extends Model {
//   constructor(
//     id: string,
//     createdAt: Date,
//     modifiedAt: Date,
//     public readonly name: string,
//   ) {
//     super(id, createdAt, modifiedAt)
//   }

//   public static fromMongo(doc: MongoCampaignModelFields): Campaign {
//     return new Campaign(doc._id, doc.createdAt, doc.modifiedAt, doc.name)
//   }

//   public toGraphQLType(): CampaignType {
//     return new CampaignType(this)
//   }
// }

// export default Campaign



export interface ModifiedAt {
  modifiedAt: Date
}

export interface DateFields extends ModifiedAt {
  createdAt: Date
}

export interface MFields extends DateFields {
  id: string
}

export interface CampaignFields {
  name: string
  userId: string
}

export interface NewCampaignFields extends CampaignFields, DateFields {}

export interface UpdatedCampaignFields extends CampaignFields, ModifiedAt {}

export interface CampaignFieldsWithModelFields extends CampaignFields, MFields {}

export class Campaign extends Model {
  public readonly name: string
  public readonly userId: string

  constructor(fields: CampaignFieldsWithModelFields) {
    super(fields.id, fields.createdAt, fields.modifiedAt)
    this.name = fields.name
    this.userId = fields.userId
  }

  public toGraphQLType(): CampaignType {
    return new CampaignType(this)
  }
}
