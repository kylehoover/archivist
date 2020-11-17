import Joi from 'joi'
import { Service } from 'typedi'
import { NewRaceFields, Race, RaceFields, RaceModelFields, UpdatedRaceFields } from '../models/Race'
import { RaceService } from '../services'
import { MongoDb, deleteById, findAll, findById, insertOne, updateById } from './MongoDb'
import { modelSchema } from './helpers'

export const raceSchema = modelSchema.keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  asiInfo: Joi.object({
    description: Joi.string().required(),
    abilityScoreIncreases: Joi.array().items(Joi.object({
      ability: Joi.string().valid(
        'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'
      ).required(),
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
})

@Service()
export class MongoRaceService implements RaceService {
  constructor(private readonly db: MongoDb) {}

  public async deleteById(id: string): Promise<Race> {
    const doc = await deleteById<RaceModelFields>(id, this.db.races, raceSchema)
    return new Race(doc)
  }

  public async findAll(filterBy?: Partial<RaceFields>): Promise<Race[]> {
    const docs = await findAll<RaceModelFields>(this.db.races, raceSchema, filterBy)
    return docs.map(fields => new Race(fields))
  }

  public async findById(id: string): Promise<Race | null> {
    const doc = await findById<RaceModelFields>(id, this.db.races, raceSchema)
    return doc === null ? null : new Race(doc)
  }

  public async insertOne(fields: NewRaceFields): Promise<Race> {
    const doc = await insertOne<RaceModelFields>(fields, this.db.races, raceSchema)
    return new Race(doc)
  }

  public async updateById(id: string, fields: UpdatedRaceFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<Race> {
    const doc = await updateById<RaceModelFields>(
      id,
      fields,
      this.db.races,
      raceSchema,
      options
    )
    return new Race(doc)
  }
}
