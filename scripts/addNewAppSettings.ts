import 'reflect-metadata'

import { addDefaultAppSettings } from '../server/helpers'
import { getServiceProvider } from '../server/services'
import { logAppSettings } from './util'

async function run(): Promise<void> {
  const serviceProvider = getServiceProvider()
  await serviceProvider.init()
  const addedAppSettings = await addDefaultAppSettings(serviceProvider.getAppSettingService())
  logAppSettings(addedAppSettings)
  process.exit()
}

run()
