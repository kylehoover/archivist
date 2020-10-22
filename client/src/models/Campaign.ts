import { makeObservable, observable } from 'mobx'

import { Model, ModelFields } from './Model'
import { CampaignType } from '../graphql'

export interface CampaignFields extends ModelFields {
  name: string
}

export class Campaign extends Model {
  public name: string

  constructor(fields: CampaignFields) {
    super(fields)

    makeObservable(this, {
      name: observable,
    })
    
    this.name = fields.name
  }

  public static fromGraphQLType(data: CampaignType): Campaign {
    return new Campaign(data)
  }
}
