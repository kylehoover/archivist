import AppSetting, { defaultAppSettings } from '../models/AppSetting'
import UserRole, { defaultUserRoles } from '../models/UserRole'
import { AppSettingService, UserRoleService, UserService } from '../services'
import { withNewModelFields, withUpdatedModelFields } from '../models/Model'

type ItemWithName = { name: string }

function nameNotInList(item: ItemWithName, list: ItemWithName[]): boolean {
  return list.every(i => i.name !== item.name)
}

export async function addDefaultAppSettings(
  appSettingService: AppSettingService,
  options?: {
    overwrite: boolean
  },
): Promise<AppSetting[]> {
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
          withUpdatedModelFields(appSettingFields))
      } else {
        appSetting = await appSettingService.insertOne(withNewModelFields(appSettingFields))
      }

      addedAppSettings.push(appSetting)
    }
  }

  return addedAppSettings
}

export async function addDefaultUserRoles(
  userRoleService: UserRoleService,
  options?: {
    overwrite: boolean
  }
): Promise<UserRole[]> {
  const installedUserRoles = await userRoleService.findAll()
  const addedUserRoles: UserRole[] = []
  const userRolesToAdd = options?.overwrite ?
    defaultUserRoles :
    defaultUserRoles.filter(userRole => nameNotInList(userRole, installedUserRoles))

  if (userRolesToAdd.length > 0) {
    for (const userRoleFields of userRolesToAdd) {
      let userRole = installedUserRoles.find(u => u.name === userRoleFields.name)

      if (options?.overwrite && userRole !== undefined) {
        userRole = await userRoleService.updateById(userRole.id, withUpdatedModelFields(userRoleFields))
      } else {
        userRole = await userRoleService.insertOne(withNewModelFields(userRoleFields))
      }

      addedUserRoles.push(userRole)
    }
  }

  return addedUserRoles
}

export async function isEmailAvailable(email: string, userService: UserService): Promise<boolean> {
  const user = await userService.findByEmail(email)
  return user === null
}
