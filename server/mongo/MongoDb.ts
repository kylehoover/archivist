import { Collection, Db, FindOneAndUpdateOption, MongoClient, MongoError, ObjectId } from 'mongodb'
import { Service } from 'typedi'
import { ObjectSchema } from 'joi'

import { ModelFields } from '../models'
import { CollectionName, MongoDocument, UpdateOperations } from './types'
import { getEnv } from '../Env'
import { docToFields } from './helpers'

export async function deleteById<T extends ModelFields>(
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

export function findAll<T extends ModelFields>(
  collection: Collection,
  schema: ObjectSchema,
): Promise<T[]> {
  return collection.find().map(doc => docToFields<T>(doc, schema)).toArray()
}

export async function findById<T extends ModelFields>(
  id: string,
  collection: Collection,
  schema: ObjectSchema,
): Promise<T | null> {
  const doc = await collection.findOne({ _id: new ObjectId(id) })
  return doc !== null ? docToFields<T>(doc, schema) : null
}

export async function insertOne<T extends ModelFields>(
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

export async function updateById<T extends ModelFields>(
  id: string,
  fields: MongoDocument,
  collection: Collection,
  schema: ObjectSchema,
  options?: FindOneAndUpdateOption<T>,
): Promise<T> {
  const fieldsToSet: MongoDocument = {}
  const fieldsToUnset: MongoDocument = {}
  const update: UpdateOperations = {}

  Object.keys(fields).forEach(key => {
    if (fields[key] === undefined) {
      fieldsToUnset[key] = ''
    } else {
      fieldsToSet[key] = fields[key]
    }
  })

  if (Object.keys(fieldsToSet).length > 0) {
    update.$set = fieldsToSet
  }

  if (Object.keys(fieldsToUnset).length > 0) {
    update.$unset = fieldsToUnset
  }

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    update,
    options,
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
