import { Collection, Db, FindOneAndUpdateOption, MongoClient, MongoError, ObjectId } from 'mongodb'
import { Service } from 'typedi'

import MongoDocument from './MongoDocument'
import { Model } from '../models'

enum CollectionName {
  AppSettings = 'appSettings',
  Campaigns = 'campaigns',
  UserRegistrationInvitations = 'userRegistrationInvitations',
  UserRegistrationRequests = 'UserRegistrationRequests',
  UserRoles = 'userRoles',
  Users = 'users',
}

enum EnvVar {
  DbName = 'AR_MONGO_DB',
  DbUrl = 'AR_MONGO_URL',
}

type mapDocumentToModelFn<T extends Model> = (doc: any) => T

@Service()
class MongoDb {
  private _db?: Db

  private get db(): Db {
    if (!this._db) {
      throw new Error('MongoDB is not connected')
    }

    return this._db
  }

  public get appSettings(): Collection {
    return this.db.collection(CollectionName.AppSettings)
  }

  public get campaigns(): Collection {
    return this.db.collection(CollectionName.Campaigns)
  }

  public get userRegistrationInvitations(): Collection {
    return this.db.collection(CollectionName.UserRegistrationInvitations)
  }

  public get userRegistrationRequests(): Collection {
    return this.db.collection(CollectionName.UserRegistrationRequests)
  }

  public get userRoles(): Collection {
    return this.db.collection(CollectionName.UserRoles)
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

  public static async insertOne<T extends Model>(
    fields: MongoDocument,
    collection: Collection,
    mapFn: mapDocumentToModelFn<T>,
  ): Promise<T> {
    let result

    try {
      result = await collection.insertOne(fields)
    } catch (err) {
      throw new Error('MongoDB Error: Failed to insert new document')
    }

    return mapFn(result.ops[0])
  }

  public static async updateById<T extends Model>(
    id: string,
    fields: MongoDocument,
    collection: Collection,
    mapFn: mapDocumentToModelFn<T>,
    options?: FindOneAndUpdateOption,
  ): Promise<T> {
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: fields },
      options
    )

    if (result.ok) {
      return mapFn(result.value)
    }

    throw new MongoError('MongoDB Error: Failed to update document')
  }

  public async init(): Promise<void> {
    if (this._db !== undefined) {
      return
    }

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
      console.error('Failed to connect to MongoDB')
      throw err
    }

    this._db = client.db(dbName)
  }
}

export default MongoDb
