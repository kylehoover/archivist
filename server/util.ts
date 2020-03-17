import { Container } from 'typedi'

import AppSetting, { defaultSettings } from './models/AppSetting'
import UserRole, { defaultUserRoles } from './models/UserRole'
import { Model } from './models'
import { MongoServiceProvider } from './mongo'

type ItemWithName = { name: string }

function nameNotInList(item: ItemWithName, list: ItemWithName[]): boolean {
  return list.every(i => i.name !== item.name)
}

export async function addDefaultUserRoles(options?: { overwrite: boolean }): Promise<UserRole[]> {
  const serviceProvider = Container.get(MongoServiceProvider)
  await serviceProvider.init()

  const userRoleService = serviceProvider.getUserRoleService()
  const installedUserRoles = await userRoleService.findAll()
  const userRolesToAdd = options?.overwrite ?
    defaultUserRoles :
    defaultUserRoles.filter(userRole => nameNotInList(userRole, installedUserRoles))

  const addedUserRoles: UserRole[] = []

  if (userRolesToAdd.length > 0) {
    for (const userRoleFields of userRolesToAdd) {
      const userRole = await userRoleService.insertOne(Model.getNewModelFields(userRoleFields))
      addedUserRoles.push(userRole)
    }
  }

  return addedUserRoles
}

export async function addNewAppSettings(): Promise<AppSetting[]> {
  const serviceProvider = Container.get(MongoServiceProvider)
  await serviceProvider.init()

  const appSettingService = serviceProvider.getAppSettingService()
  const installedAppSettings = await appSettingService.findAll()
  const appSettingsToAdd = defaultSettings.filter(setting => nameNotInList(setting, installedAppSettings))
  const addedAppSettings: AppSetting[] = []

  if (appSettingsToAdd.length > 0) {
    for (const appSettingFields of appSettingsToAdd) {
      const appSetting = await appSettingService.insertOne(Model.getNewModelFields(appSettingFields))
      addedAppSettings.push(appSetting)
    }
  }

  return addedAppSettings
}
