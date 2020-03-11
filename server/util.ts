import { Container } from 'typedi'

import { Model } from './models'
import { MongoServiceProvider } from './mongo'
import { defaultSettings } from './models/AppSetting'

export async function addNewAppSettings(): Promise<void> {
  const serviceProvider = Container.get(MongoServiceProvider)
  await serviceProvider.init()

  const appSettingService = serviceProvider.getAppSettingService()
  const installedAppSettings = await appSettingService.findAll()

  const appSettingsToAdd = defaultSettings.filter(setting => (
    !installedAppSettings.some(installedSetting => installedSetting.name === setting.name)
  ))

  if (appSettingsToAdd.length === 0) {
    console.log('No new app settings to add')
    return
  }

  appSettingsToAdd.forEach(setting => {
    appSettingService.insertOne(Model.getNewModelFields(setting))
  })

  console.log('The following new app settings have been added:')

  appSettingsToAdd.forEach(setting => {
    console.log(`${setting.displayName} => ${setting.value}`)
  })
}
