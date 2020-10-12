import Model from './Model'
import { CampaignType } from '../graphql/types'

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

export interface CampaignModelFields extends CampaignFields, MFields {}

export class Campaign extends Model {
  public readonly name: string
  public readonly userId: string

  constructor(fields: CampaignModelFields) {
    super(fields.id, fields.createdAt, fields.modifiedAt)
    this.name = fields.name
    this.userId = fields.userId
  }

  public toGraphQLType(): CampaignType {
    return new CampaignType(this)
  }
}
