import { GraphQLString } from 'graphql'
import { Field, Int, ObjectType } from 'type-graphql'
import { Ability, AbilityScoreIncrease } from '../../../models'

@ObjectType()
export class AbilityScoreIncreaseType {
  @Field(type => GraphQLString, { nullable: true })
  public ability: Ability | null

  @Field()
  public isUserChosen: boolean

  @Field(type => Int)
  public value: number

  constructor(asi: AbilityScoreIncrease) {
    this.ability = asi.ability
    this.isUserChosen = asi.isUserChosen
    this.value = asi.value
  }
}
