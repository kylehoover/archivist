import { DateFields, Model, ModelFields, ModifiedAt } from './Model'
import { RaceType } from '../graphql/types'
import { AbilityScoreIncrease, Alignment, MightBeSystemRecord, Size } from './types'

export interface AsiInfo {
  description: string
  abilityScoreIncreases: AbilityScoreIncrease[]
}

export interface AlignmentInfo {
  description: string
  tendency: Alignment[]
}

export interface SizeInfo {
  description: string
  size: Size
}

export interface SpeedInfo {
  description: string
  walk: number
}

export interface LanguagesInfo {
  description: string
  languages: string[]
}

export interface RaceFields extends MightBeSystemRecord {
  name: string
  description: string
  asiInfo: AsiInfo
  alignmentInfo: AlignmentInfo
  sizeInfo: SizeInfo
  speedInfo: SpeedInfo
  languagesInfo: LanguagesInfo
  parentRaceId: string
  subraceIds: string[]
  userId: string
}

export interface RaceModelFields extends RaceFields, ModelFields {}
export interface NewRaceFields extends RaceFields, DateFields {}
export interface UpdatedRaceFields extends Partial<RaceFields>, ModifiedAt {}

export class Race extends Model {
  public readonly name: string
  public readonly description: string
  public readonly asiInfo: AsiInfo
  public readonly alignmentInfo: AlignmentInfo
  public readonly sizeInfo: SizeInfo
  public readonly speedInfo: SpeedInfo
  public readonly languagesInfo: LanguagesInfo
  public readonly parentRaceId: string
  public readonly subraceIds: string[]
  public readonly isSystemRecord: boolean
  public readonly userId: string

  constructor(fields: RaceModelFields) {
    super(fields)
    this.name = fields.name
    this.description = fields.description
    this.asiInfo = fields.asiInfo
    this.alignmentInfo = fields.alignmentInfo
    this.sizeInfo = fields.sizeInfo
    this.speedInfo = fields.speedInfo
    this.languagesInfo = fields.languagesInfo
    this.parentRaceId = fields.parentRaceId
    this.subraceIds = fields.subraceIds
    this.isSystemRecord = fields.isSystemRecord
    this.userId = fields.userId
  }

  public toGraphQLType(): RaceType {
    return new RaceType(this)
  }
}
