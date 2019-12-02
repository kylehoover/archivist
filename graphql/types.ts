// tslint:disable: arrow-parens

import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Campaign {
  @Field(type => ID)
  public id!: string

  @Field()
  public name!: string
}
