import { Field, ObjectType } from 'type-graphql'

import Model from './Model'

@ObjectType()
class Campaign extends Model {
  @Field({ description: 'The name of the campaign' })
  public name!: string
}

export default Campaign
