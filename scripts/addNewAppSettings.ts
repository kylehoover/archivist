import 'reflect-metadata'

import { addDefaultAppSettings } from '../server/util'
import { logAppSettings, setupEnv } from './util'

async function runSetup(): Promise<void> {
  await setupEnv()
  const addedAppSettings = await addDefaultAppSettings()
  logAppSettings(addedAppSettings)
  process.exit(0)
}

runSetup()
