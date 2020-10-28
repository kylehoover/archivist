import { Field, ObjectType } from 'type-graphql'
import { GraphQLString } from 'graphql'
import { AlignmentInfo, AsiInfo, Race } from '../../../models/Race'
import { Alignment } from '../../../models/types'
import { AbilityScoreIncreaseType } from './AbilityScoreIncreaseType'
import { ModelType } from './ModelType'

@ObjectType()
class AsiInfoType {
  @Field()
  public description: string

  @Field(type => [AbilityScoreIncreaseType])
  public abilityScoreIncreases: AbilityScoreIncreaseType[]

  constructor(asiInfo: AsiInfo) {
    this.description = asiInfo.description
    this.abilityScoreIncreases = asiInfo.abilityScoreIncreases.map(asi => new AbilityScoreIncreaseType(asi))
  }
}

@ObjectType()
class AlignmentInfoType {
  @Field()
  public description: string

  @Field(type => [GraphQLString])
  public tendency: Alignment[]

  constructor(alignmentInfo: AlignmentInfo) {
    this.description = alignmentInfo.description
    this.tendency = alignmentInfo.tendency
  }
}

@ObjectType()
export class RaceType extends ModelType {
  @Field()
  public name: string

  @Field()
  public description: string

  @Field()
  public asiInfo: AsiInfoType

  @Field()
  public alignmentInfo: AlignmentInfoType

  constructor(race: Race) {
    super(race)
    this.name = race.name
    this.description = race.description
    this.asiInfo = new AsiInfoType(race.asiInfo)
    this.alignmentInfo = new AlignmentInfoType(race.alignmentInfo)
  }
}
