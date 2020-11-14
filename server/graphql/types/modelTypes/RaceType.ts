import { Field, ObjectType } from 'type-graphql'
import { GraphQLString } from 'graphql'
import {
  AgeInfo,
  Alignment,
  AlignmentInfo,
  AsiInfo,
  LanguagesInfo,
  Race,
  RacialTrait,
  Size,
  SizeInfo,
  SpeedInfo,
} from '../../../models'
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
class AgeInfoType {
  @Field()
  public description: string

  constructor(ageInfo: AgeInfo) {
    this.description = ageInfo.description
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
class SizeInfoType {
  @Field()
  public description: string

  @Field()
  public size: Size

  constructor(sizeInfo: SizeInfo) {
    this.description = sizeInfo.description
    this.size = sizeInfo.size
  }
}

@ObjectType()
class SpeedInfoType {
  @Field()
  public description: string

  @Field()
  public walk: number

  constructor(speedInfo: SpeedInfo) {
    this.description = speedInfo.description
    this.walk = speedInfo.walk
  }
}

@ObjectType()
class LanguagesInfoType {
  @Field()
  public description: string

  @Field(type => [GraphQLString])
  public languages: string[]

  constructor(languagesInfo: LanguagesInfo) {
    this.description = languagesInfo.description
    this.languages = languagesInfo.languages
  }
}

@ObjectType()
class RacialTraitType {
  @Field()
  public name: string

  @Field()
  public description: string

  constructor(trait: RacialTrait) {
    this.name = trait.name
    this.description = trait.description
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
  public ageInfo: AgeInfoType

  @Field()
  public alignmentInfo: AlignmentInfoType

  @Field()
  public sizeInfo: SizeInfoType

  @Field()
  public speedInfo: SpeedInfoType

  @Field(type => [RacialTraitType])
  public traits: RacialTraitType[]

  @Field()
  public languagesInfo: LanguagesInfoType

  @Field(type => RaceType, { nullable: true })
  public parentRace: RaceType | null

  @Field(type => [RaceType])
  public subraces: RaceType[]

  constructor(race: Race) {
    super(race)
    this.name = race.name
    this.description = race.description
    this.asiInfo = new AsiInfoType(race.asiInfo)
    this.ageInfo = new AgeInfoType(race.ageInfo)
    this.alignmentInfo = new AlignmentInfoType(race.alignmentInfo)
    this.sizeInfo = new SizeInfoType(race.sizeInfo)
    this.speedInfo = new SpeedInfoType(race.speedInfo)
    this.languagesInfo = new LanguagesInfoType(race.languagesInfo)
    this.traits = race.traits.map(trait => new RacialTraitType(trait))
    this.parentRace = null
    this.subraces = []
  }
}
