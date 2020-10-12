import { Collection, Db, FindOneAndUpdateOption, MongoClient, MongoError, ObjectId } from 'mongodb'
import { Service } from 'typedi'
import { ObjectSchema } from 'joi'

import { MFields, Model } from '../models'
import { MongoDocument } from './types'
import { getEnv } from '../Env'
import { docToFields } from './helpers'

enum CollectionName {
  AppSettings = 'appSettings',
  Campaigns = 'campaigns',
  UserRegistrationInvitations = 'userRegistrationInvitations',
  UserRegistrationRequests = 'UserRegistrationRequests',
  UserRoles = 'userRoles',
  Users = 'users',
}

type mapDocumentToModelFn<T extends Model> = (doc: any) => T

export async function deleteById<T extends MFields>(
  id: string,
  collection: Collection,
  schema: ObjectSchema,
): Promise<T> {
  const result = await collection.findOneAndDelete({ _id: new ObjectId(id) })

  if (result.value === null) {
    throw new MongoError('MongoDB Error: Failed to delete document')
  }

  return docToFields<T>(result.value, schema)
}

export function findAll<T extends MFields>(
  collection: Collection,
  schema: ObjectSchema,
): Promise<T[]> {
  return collection.find().map(doc => docToFields<T>(doc, schema)).toArray()
}

export async function findById<T extends MFields>(
  id: string,
  collection: Collection,
  schema: ObjectSchema,
): Promise<T | null> {
  const doc = await collection.findOne({ _id: new ObjectId(id) })
  return doc !== null ? docToFields<T>(doc, schema) : null
}

export async function insertOne<T extends MFields>(
  fields: MongoDocument,
  collection: Collection,
  schema: ObjectSchema,
): Promise<T> {
  let result

  try {
    result = await collection.insertOne(fields)
  } catch (err) {
    throw new Error('MongoDB Error: Failed to insert new document')
  }

  return docToFields<T>(result.ops[0], schema)
}

export async function updateById<T extends MFields>(
  id: string,
  fields: MongoDocument,
  collection: Collection,
  schema: ObjectSchema,
  options?: FindOneAndUpdateOption<T>,
): Promise<T> {
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: fields },
    options
  )

  if (result.value === null) {
    throw new MongoError('MongoDB Error: Failed to update document')
  }

  return docToFields<T>(result.value, schema)
}

@Service()
export class MongoDb {
  private client?: MongoClient
  private _db?: Db

  public get db(): Db {
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

  public static async deleteById<T extends Model>(
    id: string,
    collection: Collection,
    mapFn: mapDocumentToModelFn<T>,
  ): Promise<T> {
    const result = await collection.findOneAndDelete({ _id: new ObjectId(id) })

    if (result.value === null) {
      throw new MongoError('MongoDB Error: Failed to delete document')
    }

    return mapFn(result.value)
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
    options?: FindOneAndUpdateOption<T>,
  ): Promise<T> {
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: fields },
      options
    )

    if (result.value === null) {
      throw new MongoError('MongoDB Error: Failed to update document')
    }

    return mapFn(result.value)
  }

  public async close(): Promise<void> {
    await this.client?.close()
  }

  public async init(uri: string, dbName: string): Promise<void> {
    if (this._db !== undefined) {
      return
    }

    try {
      this.client = await MongoClient.connect(uri, { useUnifiedTopology: true })
    } catch (err) {
      console.error('Failed to connect to MongoDB')
      throw err
    }

    this._db = this.client.db(dbName)
  }

  public initForTesting(): Promise<void> {
    const uri = process.env.MONGO_URL

    if (uri === undefined) {
      throw new Error('MONGO_URL environment variable should have been set by jest-mongodb')
    }

    return this.init(uri, '')
  }

  public initFromEnv(): Promise<void> {
    const env = getEnv()
    return this.init(env.MongoUri, env.MongoDbName)
  }
}
