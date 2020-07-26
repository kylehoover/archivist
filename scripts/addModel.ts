import 'reflect-metadata'

import inquirer from 'inquirer'
import path from 'path'
import util from 'util'
import { exec } from 'child_process'
import { promises as fs } from 'fs'

import { getEnv } from '../server/Env'
import * as fileContents from './modelFileContents'

const execAsync = util.promisify(exec)
const serverPath = path.join(getEnv().RootPath, 'server')
const newFiles: string[] = []
const modifiedFiles: string[] = []

async function run(): Promise<void> {
  // const answers = await inquirer.prompt([
  //   {
  //     type: 'input',
  //     name: 'modelName',
  //     message: 'Model Name:',
  //     validate: (input: string): boolean | string => {
  //       if (input.length === 0) {
  //         return 'Please enter a name'
  //       }

  //       return true
  //     },
  //   },
  // ])

  const answers = {
    modelName: 'Test',
  }

  const { modelName } = answers

  await createServiceFile(modelName)
  await createModelFile(modelName)
  await createGraphQLTypeFile(modelName)
  await createGraphQLResolverFile(modelName)

  const answers2 = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'performCleanup',
      message: 'Clean up?',
      default: true,
    },
  ])

  if (answers2.performCleanup) {
    await cleanUp()
  }
}

async function createServiceFile(modelName: string): Promise<void> {
  let filePath = path.join(serverPath, 'services', `${modelName}Service.ts`)
  await fs.writeFile(filePath, fileContents.serviceFile(modelName))
  newFiles.push(filePath)
  filePath = path.join(serverPath, 'services', 'index.ts')
  await fs.appendFile(filePath, fileContents.servicesIndex(modelName))
  modifiedFiles.push(filePath)
  filePath = path.join(serverPath, 'services', 'ServiceName.ts')
  const buffer = await fs.readFile(filePath)
  await fs.writeFile(filePath, fileContents.serviceNameFile(modelName, buffer))
  modifiedFiles.push(filePath)
}

async function createModelFile(modelName: string): Promise<void> {
  let filePath = path.join(serverPath, 'models', `${modelName}.ts`)
  await fs.writeFile(filePath, fileContents.modelFile(modelName))
  newFiles.push(filePath)
  filePath = path.join(serverPath, 'models', 'index.ts')
  await fs.appendFile(filePath, fileContents.modelsIndex(modelName))
  modifiedFiles.push(filePath)
}

async function createGraphQLTypeFile(modelName: string): Promise<void> {
  let filePath = path.join(serverPath, 'graphql', 'types', `${modelName}Type.ts`)
  await fs.writeFile(filePath, fileContents.graphQLTypeFile(modelName))
  newFiles.push(filePath)
  filePath = path.join(serverPath, 'graphql', 'types', 'index.ts')
  await fs.appendFile(filePath, fileContents.graphQLTypesIndex(modelName))
  modifiedFiles.push(filePath)
}

async function createGraphQLResolverFile(modelName: string): Promise<void> {
  let filePath = path.join(serverPath, 'graphql', 'resolvers', `${modelName}Resolver.ts`)
  await fs.writeFile(filePath, fileContents.graphQLResolverFile(modelName))
  newFiles.push(filePath)
  filePath = path.join(serverPath, 'graphql', 'resolvers', 'index.ts')
  await fs.appendFile(filePath, fileContents.graphQLResolversIndex(modelName))
  modifiedFiles.push(filePath)
}

async function cleanUp(): Promise<void> {
  for (const filePath of newFiles) {
    await fs.unlink(filePath)
  }

  for (const filePath of modifiedFiles) {
    await execAsync(`git checkout -- ${filePath}`)
  }
}

run()
