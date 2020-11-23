import { Model, ModelFields, modelSchema } from './Model'
import { RaceType } from '../graphql/types'
import {
  AgeInfo,
  AlignmentInfo,
  AsiInfo,
  DateFields,
  LanguagesInfo,
  MightBeSystemRecord,
  ModifiedAt,
  RacialTrait,
  SizeInfo,
  SpeedInfo,
} from './types'
import Joi from 'joi'
import { validateFields } from './helpers'

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
  version: string
}

export interface RaceModelFields extends RaceFields, ModelFields {}
export interface NewRaceFields extends RaceFields, DateFields {}
export interface UpdatedRaceFields extends Partial<RaceFields>, ModifiedAt {}

export const raceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  asiInfo: Joi.object({
    description: Joi.string().required(),
    abilityScoreIncreases: Joi.array().items(Joi.object({
      ability: Joi.string().valid(
        'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'
      ).allow(null),
      isUserChosen: Joi.boolean().required(),
      value: Joi.number().required(),
    })).required(),
  }),
  ageInfo: Joi.object({
    description: Joi.string().required(),
  }),
  alignmentInfo: Joi.object({
    description: Joi.string().required(),
    tendency: Joi.array().items(Joi.string()).required(),
  }),
  sizeInfo: Joi.object({
    description: Joi.string().required(),
    size: Joi.string().valid('tiny', 'small', 'medium', 'large', 'huge', 'gargantuan').required(),
  }),
  speedInfo: Joi.object({
    description: Joi.string().required(),
    walk: Joi.number().required(),
  }),
  languagesInfo: Joi.object({
    description: Joi.string().required(),
    languages: Joi.array().items(Joi.string()).required(),
  }),
  traits: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  })).required(),
  parentRaceId: Joi.string().allow(''),
  subraceIds: Joi.array().items(Joi.string()).required(),
  isSystemRecord: Joi.boolean().required(),
  userId: Joi.string().required().allow(''),
  version: Joi.string().required(),
})

export const raceModelSchema = modelSchema.concat(raceSchema)

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
  public readonly version: string

  constructor(fields: RaceModelFields) {
    validateFields(fields, raceModelSchema)
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
    this.version = fields.version
  }

  public toGraphQLType(): RaceType {
    return new RaceType(this)
  }
}
