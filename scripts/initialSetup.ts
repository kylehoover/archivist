import 'reflect-metadata'

import { addDefaultAppSettings, addDefaultUserRoles } from '../server/helpers/db'
import { logAppSettings, logUserRoles } from './util'

async function runSetup(): Promise<void> {
  const addedAppSettings = await addDefaultAppSettings({ overwrite: true })
  const addedUserRoles = await addDefaultUserRoles({ overwrite: true })

  logAppSettings(addedAppSettings)
  logUserRoles(addedUserRoles)

  process.exit(0)
}

runSetup()
