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
  test('deleteById removes a document from the appSettings collection', async () => {
    const id = initialAppSettings[0].id
    const appSetting = await appSettingService.deleteById(id)
    const appSettings = await db.appSettings.find().map(AppSetting.fromMongo).toArray()
    const deletedAppSetting = appSettings.find(setting => setting.id === id)
    expect(appSetting).toEqual(initialAppSettings[0])
    expect(deletedAppSetting).toBeUndefined()
    expect(appSettings).toEqual(initialAppSettings.filter(as => as.id !== id))
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
    const fieldsAsModel = AppSetting.fromMongo(appSettingFields as MongoAppSettingModelFields)
    const appSettings = await db.appSettings.find().map(AppSetting.fromMongo).toArray()
    const insertedAppSetting = appSettings.find(as => as.id === fieldsAsModel.id)
    expect(appSetting).toEqual(fieldsAsModel)
    expect(insertedAppSetting).toEqual(fieldsAsModel)
    expect(appSettings).toEqual([...initialAppSettings, fieldsAsModel])
  })

  test('updateById updates a document in the appSettings collection', async () => {
    const appSetting = initialAppSettings[0]
    const updatedFields = Model.getUpdatedModelFields({
      displayName: 'Updated Display Name',
      description: 'Updated description.',
    })
    const updatedAppSetting = await appSettingService.updateById(appSetting.id, updatedFields)
    const appSettings = await db.appSettings.find().map(AppSetting.fromMongo).toArray()
    const updatedAppSettingFromDb = appSettings.find(as => as.id === appSetting.id)
    const updatedInitialAppSettings = initialAppSettings.map(as => as.id === appSetting.id ? updatedAppSetting : as)
    expect(updatedAppSetting.id).toEqual(appSetting.id)
    expect(updatedAppSetting.createdAt).toEqual(appSetting.createdAt)
    expect(updatedAppSetting.modifiedAt).toEqual(updatedFields.modifiedAt)
    expect(updatedAppSetting.name).toEqual(appSetting.name)
    expect(updatedAppSetting.value).toEqual(appSetting.value)
    expect(updatedAppSetting.displayName).toEqual(updatedFields.displayName)
    expect(updatedAppSetting.description).toEqual(updatedFields.description)
    expect(updatedAppSettingFromDb).toEqual(updatedAppSetting)
    expect(appSettings).toEqual(updatedInitialAppSettings)
  })
})
