import 'reflect-metadata'

import { addDefaultAppSettings, addDefaultUserRoles } from '../server/helpers'
import { getServiceProvider } from '../server/services'
import { logAppSettings, logUserRoles } from './util'

async function runSetup(): Promise<void> {
  const serviceProvider = getServiceProvider()
  await serviceProvider.init()
  const addedAppSettings = await addDefaultAppSettings(serviceProvider.getAppSettingService(), {
    overwrite: true,
  })
  const addedUserRoles = await addDefaultUserRoles(serviceProvider.getUserRoleService(), {
    overwrite: true,
  })

  logAppSettings(addedAppSettings)
  logUserRoles(addedUserRoles)

  process.exit()
}

runSetup()
