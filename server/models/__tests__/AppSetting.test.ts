import 'reflect-metadata'
import { AppSetting, AppSettingName } from '../AppSetting'

describe('AppSetting', () => {
  test('listToMap converts an AppSetting list to an AppSettingsMap', () => {
    const appSetting = new AppSetting({
      id: '1',
      createdAt: new Date(),
      modifiedAt: new Date(),
      name: AppSettingName.NumDaysInvitationIsValid,
      value: 30,
      displayName: 'Display name',
      description: 'Description',
    })
    const appSettings = [appSetting]
    const appSettingsMap = AppSetting.listToMap(appSettings)
    expect(appSettingsMap).toEqual({ [AppSettingName.NumDaysInvitationIsValid]: 30 })
  })
})
