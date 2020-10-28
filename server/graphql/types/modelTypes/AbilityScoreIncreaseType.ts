import { Field, Int, ObjectType } from 'type-graphql'
import { Ability, AbilityScoreIncrease } from '../../../models'

@ObjectType()
export class AbilityScoreIncreaseType {
  @Field()
  public ability: Ability

  @Field(type => Int)
  public value: number

  constructor(asi: AbilityScoreIncrease) {
    this.ability = asi.ability
    this.value = asi.value
  }
}
