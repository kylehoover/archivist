import 'reflect-metadata'

import AppSetting, { AppSettingName, MongoAppSettingModelFields } from '../AppSetting'
import { AppSettingType } from '../../graphql/types'

describe('AppSetting', () => {
  test('fromMongo returns a new AppSetting object', () => {
    const doc: MongoAppSettingModelFields = {
      _id: '1',
      createdAt: new Date(),
      modifiedAt: new Date(),
      name: AppSettingName.AllowOpenRegistration,
      value: false,
      displayName: 'Display Name',
      description: 'Description',
    }
    const appSetting = new AppSetting(
      doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.value, doc.displayName, doc.description
    )
    expect(AppSetting.fromMongo(doc)).toEqual(appSetting)
  })

  test('listToMap converts an AppSetting list to an AppSettingsMap', () => {
    const appSetting = new AppSetting(
      '1', new Date(), new Date(), AppSettingName.AllowOpenRegistration, false, 'Display Name', 'Description'
    )
    const appSettings = [appSetting]
    const appSettingsMap = AppSetting.listToMap(appSettings)
    expect(appSettingsMap).toEqual({ [AppSettingName.AllowOpenRegistration]: false })
  })

  test('toGraphQLType converts an AppSetting into an AppSettingType', () => {
    const appSetting = new AppSetting(
      '1', new Date(), new Date(), AppSettingName.AllowOpenRegistration, false, 'Display Name', 'Description'
    )
    const appSettingType = new AppSettingType(appSetting)
    expect(appSetting.toGraphQLType()).toEqual(appSettingType)
  })
})
