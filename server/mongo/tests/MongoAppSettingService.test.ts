import 'reflect-metadata'

import { ObjectId } from 'mongodb'

import AppSetting, { AppSettingName, MongoAppSettingModelFields, defaultAppSettings } from '../../models/AppSetting'
import MongoAppSettingService from '../MongoAppSettingService'
import MongoDb from '../MongoDb'
import { Model } from '../../models'

const db = new MongoDb()
const appSettingService = new MongoAppSettingService(db)
let initialAppSettings: AppSetting[] = []

beforeAll(async () => {
  await db.initForTesting()
})

afterAll(async () => {
  await db.close()
})

beforeEach(async () => {
  const result = await db.appSettings.insertMany(defaultAppSettings.map(setting => Model.getNewModelFields(setting)))
  initialAppSettings = result.ops.map(AppSetting.fromMongo)
})

afterEach(async () => {
  await db.appSettings.deleteMany({})
})

describe('MongoAppSettingService', () => {
  test('deleteById removes a document from the appSettings collection if the id exists', async () => {
    const id = initialAppSettings[0].id
    const appSetting = await appSettingService.deleteById(id)
    expect(appSetting).toEqual(initialAppSettings[0])

    const appSettingDoc = await db.appSettings.findOne({ _id: new ObjectId(id) })
    expect(appSettingDoc).toBeNull()
  })

  test('deleteById throws an error if the id does not exist', async () => {
    const appSettingPromise = appSettingService.deleteById((new ObjectId()).toHexString())
    await expect(appSettingPromise).rejects.toThrowError()
  })

  test('findAll returns all documents in the appSettings collection', async () => {
    const appSettings = await appSettingService.findAll()
    expect(appSettings).toEqual(initialAppSettings)
  })

  test('findById returns an AppSetting object if the id exists', async () => {
    const appSetting = await appSettingService.findById(initialAppSettings[0].id)
    expect(appSetting).toEqual(initialAppSettings[0])
  })

  test('findById returns null if the id does not exist', async () => {
    const appSetting = await appSettingService.findById((new ObjectId()).toHexString())
    expect(appSetting).toBeNull()
  })

  test('insertOne adds a new document to the appSettings collection', async () => {
    const appSettingFields = Model.getNewModelFields({
      name: AppSettingName.AllowOpenRegistration,
      value: 'value',
      displayName: 'displayName',
      description: 'description',
    })

    const appSetting = await appSettingService.insertOne(appSettingFields)
    expect(appSetting).toEqual(AppSetting.fromMongo(appSettingFields as MongoAppSettingModelFields))

    const appSettingDoc = await db.appSettings.findOne({ _id: new ObjectId(appSetting.id) })
    expect(appSettingDoc).toEqual(appSettingFields as MongoAppSettingModelFields)
  })

  test('updateById updates a document in the appSettings collection if the id exists', async () => {
    const appSetting = initialAppSettings[0]
    const updatedFields = Model.getUpdatedModelFields({
      displayName: 'Updated Display Name',
      description: 'Updated description.',
    })
    const appSettingUpdated = await appSettingService.updateById(appSetting.id, updatedFields)

    expect(appSettingUpdated.id).toEqual(appSetting.id)
    expect(appSettingUpdated.createdAt).toEqual(appSetting.createdAt)
    expect(appSettingUpdated.modifiedAt).toEqual(updatedFields.modifiedAt)
    expect(appSettingUpdated.name).toEqual(appSetting.name)
    expect(appSettingUpdated.value).toEqual(appSetting.value)
    expect(appSettingUpdated.displayName).toEqual(updatedFields.displayName)
    expect(appSettingUpdated.description).toEqual(updatedFields.description)

    const appSettingDoc = await db.appSettings.findOne({ _id: new ObjectId(appSetting.id) })
    expect(AppSetting.fromMongo(appSettingDoc)).toEqual(appSettingUpdated)
  })

  test('updateById throws an error if the id does not exist', async () => {
    const updatedFields = Model.getUpdatedModelFields({
      displayName: 'Updated Display Name',
      description: 'Updated description.',
    })
    const appSettingPromise = appSettingService.updateById((new ObjectId()).toHexString(), updatedFields)
    await expect(appSettingPromise).rejects.toThrowError()
  })
})
