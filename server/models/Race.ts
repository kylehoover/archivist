import { DateFields, Model, ModelFields, ModifiedAt } from './Model'
import { RaceType } from '../graphql/types'
import {
  AgeInfo,
  AlignmentInfo,
  AsiInfo,
  LanguagesInfo,
  MightBeSystemRecord,
  RacialTrait,
  SizeInfo,
  SpeedInfo,
} from './types'

export interface RaceFields extends MightBeSystemRecord {
  name: string
  description: string
  asiInfo: AsiInfo
  ageInfo: AgeInfo
  alignmentInfo: AlignmentInfo
  sizeInfo: SizeInfo
  speedInfo: SpeedInfo
  languagesInfo: LanguagesInfo
  traits: RacialTrait[]
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
  public readonly ageInfo: AgeInfo
  public readonly alignmentInfo: AlignmentInfo
  public readonly sizeInfo: SizeInfo
  public readonly speedInfo: SpeedInfo
  public readonly languagesInfo: LanguagesInfo
  public readonly traits: RacialTrait[]
  public readonly parentRaceId: string
  public readonly subraceIds: string[]
  public readonly isSystemRecord: boolean
  public readonly userId: string

  constructor(fields: RaceModelFields) {
    super(fields)
    this.name = fields.name
    this.description = fields.description
    this.asiInfo = fields.asiInfo
    this.ageInfo = fields.ageInfo
    this.alignmentInfo = fields.alignmentInfo
    this.sizeInfo = fields.sizeInfo
    this.speedInfo = fields.speedInfo
    this.languagesInfo = fields.languagesInfo
    this.traits = fields.traits
    this.parentRaceId = fields.parentRaceId
    this.subraceIds = fields.subraceIds
    this.isSystemRecord = fields.isSystemRecord
    this.userId = fields.userId
  }

  public toGraphQLType(): RaceType {
    return new RaceType(this)
  }
}
