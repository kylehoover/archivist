import { Collection, Db, MongoClient, ObjectId } from 'mongodb'
import { Service } from 'typedi'

import { Model } from '../models'

enum CollectionName {
  Campaigns = 'campaigns',
  Users = 'users',
}

enum EnvVar {
  DbName = 'AR_MONGO_DB',
  DbUrl = 'AR_MONGO_URL',
}

type mapDocumentToModelFn<T extends Model> = (doc: any) => T

@Service()
class MongoDb {
  private conn?: Db

  private get db(): Db {
    if (!this.conn) {
      throw new Error('MongoDB is not connected')
    }

    return this.conn
  }

  public get campaigns(): Collection {
    return this.db.collection(CollectionName.Campaigns)
  }

  public get users(): Collection {
    return this.db.collection(CollectionName.Users)
  }

  public static findAll<T extends Model>(
    collection: Collection,
    mapFn: mapDocumentToModelFn<T>,
  ): Promise<T[]> {
    return collection.find().map(mapFn).toArray()
  }

  public static async findById<T extends Model>(
    id: string,
    collection: Collection,
    mapFn: mapDocumentToModelFn<T>,
  ): Promise<T | null> {
    const doc = await collection.findOne({ _id: new ObjectId(id) })
    return doc !== null ? mapFn(doc) : null
  }

  public async init(): Promise<void> {
    const dbName = process.env[EnvVar.DbName]
    const url = process.env[EnvVar.DbUrl]
    let client: MongoClient

    if (!dbName) {
      throw new Error(`${EnvVar.DbName} environment variable is not set`)
    }

    if (!url) {
      throw new Error(`${EnvVar.DbUrl} environment variable is not set`)
    }

    try {
      client = await MongoClient.connect(url, { useUnifiedTopology: true })
    } catch (err) {
      console.error('Failed to connect to MongoDb')
      throw err
    }

    this.conn = client.db(dbName)
  }
}

export default MongoDb
