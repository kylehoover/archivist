import Joi from 'joi'
import { Service } from 'typedi'
import { Race, RaceModelFields, NewRaceFields, UpdatedRaceFields } from '../models/Race'
import { RaceService } from '../services'
import { MongoDb, deleteById, findAll, findById, insertOne, updateById } from './MongoDb'
import { modelSchema } from './helpers'

const raceSchema = modelSchema.keys({

})

@Service()
export class MongoRaceService implements RaceService {
  constructor(private readonly db: MongoDb) {}

  public async deleteById(id: string): Promise<Race> {
    const doc = await deleteById<RaceModelFields>(id, this.db.races, raceSchema)
    return new Race(doc)
  }

  public async findAll(): Promise<Race[]> {
    const docs = await findAll<RaceModelFields>(this.db.races, raceSchema)
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
