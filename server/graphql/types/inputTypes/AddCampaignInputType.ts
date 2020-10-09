import { Field, InputType } from 'type-graphql'
import { IsNotEmpty, MaxLength } from 'class-validator'

@InputType()
class AddCampaignInputType {
  @Field()
  @IsNotEmpty()
  @MaxLength(50)
  public name!: string
}

export default AddCampaignInputType
