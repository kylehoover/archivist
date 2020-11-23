import { Model, ModelFields } from './Model'
import { CampaignType } from '../graphql/types'
import { DateFields, ModifiedAt } from './types'

export interface CampaignFields {
  name: string
  userId: string
}

export interface CampaignModelFields extends CampaignFields, ModelFields {}
export interface NewCampaignFields extends CampaignFields, DateFields {}
export interface UpdatedCampaignFields extends Partial<CampaignFields>, ModifiedAt {}

export class Campaign extends Model {
  public readonly name: string
  public readonly userId: string

  constructor(fields: CampaignModelFields) {
    super(fields)
    this.name = fields.name
    this.userId = fields.userId
  }

  public toGraphQLType(): CampaignType {
    return new CampaignType(this)
  }
}
