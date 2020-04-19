import AppSetting, { defaultAppSettings } from '../models/AppSetting'
import UserRole, { defaultUserRoles } from '../models/UserRole'
import { Model } from '../models'
import { getServiceProvider } from '../services/util'

type ItemWithName = { name: string }

function nameNotInList(item: ItemWithName, list: ItemWithName[]): boolean {
  return list.every(i => i.name !== item.name)
}

export async function addDefaultAppSettings(options?: { overwrite: boolean }): Promise<AppSetting[]> {
  const serviceProvider = getServiceProvider()
  await serviceProvider.init()

  const appSettingService = serviceProvider.getAppSettingService()
  const installedAppSettings = await appSettingService.findAll()
  const addedAppSettings: AppSetting[] = []
  const appSettingsToAdd = options?.overwrite ?
    defaultAppSettings :
    defaultAppSettings.filter(setting => nameNotInList(setting, installedAppSettings))

  if (appSettingsToAdd.length > 0) {
    for (const appSettingFields of appSettingsToAdd) {
      let appSetting = installedAppSettings.find(a => a.name === appSettingFields.name)

      if (options?.overwrite && appSetting !== undefined) {
        appSetting = await appSettingService.updateById(appSetting.id,
          Model.getUpdatedModelFields(appSettingFields))
      } else {
        appSetting = await appSettingService.insertOne(Model.getNewModelFields(appSettingFields))
      }

      addedAppSettings.push(appSetting)
    }
  }

  return addedAppSettings
}

export async function addDefaultUserRoles(options?: { overwrite: boolean }): Promise<UserRole[]> {
  const serviceProvider = getServiceProvider()
  await serviceProvider.init()

  const userRoleService = serviceProvider.getUserRoleService()
  const installedUserRoles = await userRoleService.findAll()
  const addedUserRoles: UserRole[] = []
  const userRolesToAdd = options?.overwrite ?
    defaultUserRoles :
    defaultUserRoles.filter(userRole => nameNotInList(userRole, installedUserRoles))

  if (userRolesToAdd.length > 0) {
    for (const userRoleFields of userRolesToAdd) {
      let userRole = installedUserRoles.find(u => u.name === userRoleFields.name)

      if (options?.overwrite && userRole !== undefined) {
        userRole = await userRoleService.updateById(userRole.id,
          Model.getUpdatedModelFields(userRoleFields))
      } else {
        userRole = await userRoleService.insertOne(Model.getNewModelFields(userRoleFields))
      }

      addedUserRoles.push(userRole)
    }
  }

  return addedUserRoles
}
