import 'reflect-metadata'

import { addDefaultAppSettings } from '../server/helpers/db'
import { logAppSettings } from './util'

async function runSetup(): Promise<void> {
  const addedAppSettings = await addDefaultAppSettings()
  logAppSettings(addedAppSettings)
  process.exit(0)
}

runSetup()
