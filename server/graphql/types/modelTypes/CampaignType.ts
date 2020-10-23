import { Field, ObjectType } from 'type-graphql'
import { Campaign } from '../../../models'
import { ModelType } from './ModelType'

@ObjectType()
export class CampaignType extends ModelType {
  @Field({ description: 'The name of the campaign' })
  public name: string

  constructor(campaign: Campaign) {
    super(campaign)
    this.name = campaign.name
  }
}
