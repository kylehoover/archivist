import { Field, ObjectType } from 'type-graphql'

import Model from './Model'

@ObjectType()
class Campaign extends Model {
  @Field()
  public name!: string
}

export default Campaign
