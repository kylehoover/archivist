import 'reflect-metadata'

import { addDefaultAppSettings } from '../server/helpers/db'
import { logAppSettings } from './util'

async function run(): Promise<void> {
  const addedAppSettings = await addDefaultAppSettings()
  logAppSettings(addedAppSettings)
  process.exit()
}

run()
