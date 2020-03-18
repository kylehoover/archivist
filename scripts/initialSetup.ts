import 'reflect-metadata'

import { addDefaultAppSettings, addDefaultUserRoles } from '../server/util'
import { logAppSettings, logUserRoles, setupEnv } from './util'

async function runSetup(): Promise<void> {
  await setupEnv()

  const addedAppSettings = await addDefaultAppSettings({ overwrite: true })
  const addedUserRoles = await addDefaultUserRoles({ overwrite: true })

  logAppSettings(addedAppSettings)
  logUserRoles(addedUserRoles)

  process.exit(0)
}

runSetup()
