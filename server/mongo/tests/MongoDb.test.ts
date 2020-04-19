import 'reflect-metadata'

import { Collection, ObjectId } from 'mongodb'

import MongoDb from '../MongoDb'
import { Model } from '../../models'
import { ModelType } from '../../graphql/types'

class MockModel extends Model {
  constructor(id: string, createdAt: Date, modifiedAt: Date) {
    super(id, createdAt, modifiedAt)
  }

  public static fromMongo(doc: any): MockModel {
    return new MockModel(doc._id, doc.createdAt, doc.modifiedAt)
  }

  public toGraphQLType(): ModelType {
    throw new Error('MockModel.toGraphQLType() not implemented')
  }
}

const mongoDb = new MongoDb()
let collection: Collection
let initialModels: Model[] = []

beforeAll(async () => {
  await mongoDb.initForTesting()
  collection = mongoDb.db.collection('mockCollection')
})

afterAll(async () => {
  await mongoDb.close()
})

beforeEach(async () => {
  for (let i = 0; i < 5; i++) {
    const result = await collection.insertOne(Model.getNewModelFields({}))
    initialModels.push(MockModel.fromMongo(result.ops[0]))
  }
})

afterEach(async () => {
  await collection.deleteMany({})
  initialModels = []
})

describe('MongoDb', () => {
  test('deleteById removes a document from a collection if the id exists', async () => {
    const id = initialModels[0].id
    const model = await MongoDb.deleteById(id, collection, MockModel.fromMongo)
    const models = await collection.find().map(MockModel.fromMongo).toArray()
    const deletedModel = models.find(setting => setting.id === id)
    expect(model).toEqual(initialModels[0])
    expect(deletedModel).toBeUndefined()
    expect(models).toEqual(initialModels.filter(as => as.id !== id))
  })

  test('deleteById throws an error if the id does not exist', async () => {
    const modelPromise = MongoDb.deleteById((new ObjectId()).toHexString(), collection, MockModel.fromMongo)
    await expect(modelPromise).rejects.toThrowError()
    const models = await collection.find().map(MockModel.fromMongo).toArray()
    expect(models).toEqual(initialModels)
  })

  test('findAll returns all documents in a collection', async () => {
    const models = await MongoDb.findAll(collection, MockModel.fromMongo)
    expect(models).toEqual(initialModels)
  })

  test('findById returns a model object if the id exists', async () => {
    const model = await MongoDb.findById(initialModels[0].id, collection, MockModel.fromMongo)
    expect(model).toEqual(initialModels[0])
  })

  test('findById returns null if the id does not exist', async () => {
    const model = await MongoDb.findById((new ObjectId()).toHexString(), collection, MockModel.fromMongo)
    expect(model).toBeNull()
  })

  test('insertOne adds a new document to a collection', async () => {
    const modelFields = Model.getNewModelFields({})
    const model = await MongoDb.insertOne(modelFields, collection, MockModel.fromMongo)
    const fieldsAsModel = MockModel.fromMongo(modelFields)
    const models = await collection.find().map(MockModel.fromMongo).toArray()
    const insertedModel = models.find(m => m.id === fieldsAsModel.id)
    expect(model).toEqual(fieldsAsModel)
    expect(insertedModel).toEqual(fieldsAsModel)
    expect(models).toEqual([...initialModels, fieldsAsModel])
  })

  test('updateById updates a document in a collection if the id exists', async () => {
    const model = initialModels[0]
    const updatedFields = Model.getUpdatedModelFields({})
    const updatedModel = await MongoDb.updateById(
      model.id, updatedFields, collection, MockModel.fromMongo, { returnOriginal: false }
    )
    const models = await collection.find().map(MockModel.fromMongo).toArray()
    const updatedModelFromDb = models.find(m => m.id === model.id)
    const updatedInitialCampaigns = initialModels.map(m => m.id === model.id ? updatedModel : m)
    expect(updatedModel.id).toEqual(model.id)
    expect(updatedModel.createdAt).toEqual(model.createdAt)
    expect(updatedModel.modifiedAt).toEqual(updatedFields.modifiedAt)
    expect(updatedModelFromDb).toEqual(updatedModel)
    expect(models).toEqual(updatedInitialCampaigns)
  })

  test('updateById throws an error if the id does not exist', async () => {
    const updatedFields = Model.getUpdatedModelFields({ name: 'Updated Name' })
    const modelPromise = MongoDb.updateById(
      (new ObjectId()).toHexString(), updatedFields, collection, MockModel.fromMongo
    )
    await expect(modelPromise).rejects.toThrowError()
    const models = await collection.find().map(MockModel.fromMongo).toArray()
    expect(models).toEqual(initialModels)
  })
})
