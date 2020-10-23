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
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'modelName',
      message: 'Model Name:',
      validate: (input: string): boolean | string => {
        if (input.length === 0) {
          return 'Please enter a name'
        }

        return true
      },
    },
    {
      type: 'input',
      name: 'modelNamePlural',
      message: 'Model Name Plural:',
      validate: (input: string): boolean | string => {
        if (input.length === 0) {
          return 'Please enter a name'
        }

        return true
      },
    },
  ])

  const { modelName, modelNamePlural } = answers

  await createModelFile(modelName)
  await createServiceFile(modelName)
  await createGraphQLTypeFile(modelName)
  await createGraphQLResolverFile(modelName, modelNamePlural)
  await createMongoServiceFile(modelName, modelNamePlural)

  const answers2 = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'revertChanges',
      message: 'Revert changes?',
      default: true,
    },
  ])

  if (answers2.revertChanges) {
    await revertChanges()
  }
}

async function createModelFile(modelName: string): Promise<void> {
  // models/{Model}.ts
  let filePath = path.join(serverPath, 'models', `${modelName}.ts`)
  await fs.writeFile(filePath, fileContents.modelFile(modelName))
  newFiles.push(filePath)
  // models/index.ts
  filePath = path.join(serverPath, 'models', 'index.ts')
  const buffer = await fs.readFile(filePath)
  await fs.writeFile(filePath, fileContents.modelsIndexFile(modelName, buffer))
  modifiedFiles.push(filePath)
}

async function createServiceFile(modelName: string): Promise<void> {
  // services/{Model}Service.ts
  let filePath = path.join(serverPath, 'services', `${modelName}Service.ts`)
  await fs.writeFile(filePath, fileContents.serviceFile(modelName))
  newFiles.push(filePath)
  // services/ServiceProvider.ts
  filePath = path.join(serverPath, 'services', 'ServiceProvider.ts')
  let buffer = await fs.readFile(filePath)
  await fs.writeFile(filePath, fileContents.serviceProvderFile(modelName, buffer))
  modifiedFiles.push(filePath)
  // services/ServiceName.ts
  filePath = path.join(serverPath, 'services', 'ServiceName.ts')
  buffer = await fs.readFile(filePath)
  await fs.writeFile(filePath, fileContents.serviceNameFile(modelName, buffer))
  modifiedFiles.push(filePath)
  // services/util.ts
  filePath = path.join(serverPath, 'services', 'util.ts')
  buffer = await fs.readFile(filePath)
  await fs.writeFile(filePath, fileContents.servicesUtilFile(modelName, buffer))
  modifiedFiles.push(filePath)
  // services/index.ts
  filePath = path.join(serverPath, 'services', 'index.ts')
  buffer = await fs.readFile(filePath)
  await fs.writeFile(filePath, fileContents.servicesIndexFile(modelName, buffer))
  modifiedFiles.push(filePath)
}

async function createGraphQLTypeFile(modelName: string): Promise<void> {
  // graphql/types/modelTypes/{Model}Type.ts
  let filePath = path.join(serverPath, 'graphql', 'types', 'modelTypes', `${modelName}Type.ts`)
  await fs.writeFile(filePath, fileContents.graphQLTypeFile(modelName))
  newFiles.push(filePath)
  // graphql/types/modelTypes/index.ts
  filePath = path.join(serverPath, 'graphql', 'types', 'modelTypes', 'index.ts')
  const buffer = await fs.readFile(filePath)
  await fs.writeFile(filePath, fileContents.graphQLTypesIndexFile(modelName, buffer))
  modifiedFiles.push(filePath)
}

async function createGraphQLResolverFile(modelName: string, modelNamePlural: string): Promise<void> {
  // graphql/resolvers/{Model}Resolver.ts
  let filePath = path.join(serverPath, 'graphql', 'resolvers', `${modelName}Resolver.ts`)
  await fs.writeFile(filePath, fileContents.graphQLResolverFile(modelName, modelNamePlural))
  newFiles.push(filePath)
  // graphql/resolvers/index.ts
  filePath = path.join(serverPath, 'graphql', 'resolvers', 'index.ts')
  const buffer = await fs.readFile(filePath)
  await fs.writeFile(filePath, fileContents.graphQLResolversIndexFile(modelName, buffer))
  modifiedFiles.push(filePath)
}

async function createMongoServiceFile(modelName: string, modelNamePlural: string): Promise<void> {
  // mongo/MongoDb.ts
  let filePath = path.join(serverPath, 'mongo', 'MongoDb.ts')
  let buffer = await fs.readFile(filePath)
  await fs.writeFile(filePath, fileContents.mongoDbFile(modelName, modelNamePlural, buffer))
  modifiedFiles.push(filePath)
  // mongo/Mongo{Model}Service.ts
  filePath = path.join(serverPath, 'mongo', `Mongo${modelName}Service.ts`)
  await fs.writeFile(filePath, fileContents.mongoServiceFile(modelName, modelNamePlural))
  newFiles.push(filePath)
  // mongo/MongoServiceProvider.ts
  filePath = path.join(serverPath, 'mongo', 'MongoServiceProvider.ts')
  buffer = await fs.readFile(filePath)
  await fs.writeFile(filePath, fileContents.mongoServiceProviderFile(modelName, buffer))
  modifiedFiles.push(filePath)
}

async function revertChanges(): Promise<void> {
  for (const filePath of newFiles) {
    await fs.unlink(filePath)
  }

  for (const filePath of modifiedFiles) {
    await execAsync(`git checkout -- ${filePath}`)
  }
}

run()
