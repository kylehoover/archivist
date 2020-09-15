import { Field, ObjectType } from 'type-graphql'

import ModelType from './ModelType'
import { Campaign } from '../../../models'

@ObjectType()
class CampaignType extends ModelType {
  @Field({ description: 'The name of the campaign' })
  public name: string

  constructor(campaign: Campaign) {
    super(campaign)
    this.name = campaign.name
  }
}

export default CampaignType
