import 'reflect-metadata'

import { addNewAppSettings } from '../server/util'

async function setupEnv(): Promise<void> {
  const dotenv = await import('dotenv')
  dotenv.config()
}

async function runSetup(): Promise<void> {
  await setupEnv()
  await addNewAppSettings()
  process.exit(0)
}

runSetup()
