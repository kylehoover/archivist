import { Field, ID, ObjectType } from 'type-graphql'

import { Model } from '../../models'

@ObjectType()
abstract class ModelType {
  @Field(type => ID)
  public id: string

  @Field()
  public createdAt: Date

  @Field()
  public modifiedAt: Date

  protected constructor(model: Model) {
    this.id = model.id
    this.createdAt = model.createdAt
    this.modifiedAt = model.modifiedAt
  }
}

export default ModelType
