import { camelCase } from 'change-case'

export function modelFile(modelName: string): string {
  return `import Model, { MongoModelFields, NewModelFields, UpdatedModelFields } from './Model'
import { ${modelName}Type } from '../graphql/types'

export type ${modelName}Fields = {

}

export type Mongo${modelName}ModelFields = MongoModelFields & ${modelName}Fields
export type New${modelName}ModelFields = NewModelFields & ${modelName}Fields
export type Updated${modelName}ModelFields = UpdatedModelFields & Partial<${modelName}Fields>

class ${modelName} extends Model {
  constructor(
    id: string,
    createdAt: Date,
    modifiedAt: Date,
  ) {
    super(id, createdAt, modifiedAt)
  }

  public static fromMongo(doc: Mongo${modelName}ModelFields): ${modelName} {
    return new ${modelName}(doc._id, doc.createdAt, doc.modifiedAt)
  }

  public toGraphQLType(): ${modelName}Type {
    return new ${modelName}Type(this)
  }
}

export default ${modelName}
`
}

export function modelsIndexFile(modelName: string, buffer: Buffer): string {
  let added1 = false
  let added2 = false
  let canAdd2 = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str1 = `export { default as ${modelName} } from './${modelName}'\n`
  const str2 = `export * from './${modelName}'\n`

  lines.forEach(line => {
    const lineTrimmed = line.trim()

    if (!added1 && (lineTrimmed === '' || str1 < line)) {
      output += str1
      added1 = true
    }

    if (canAdd2 && !added2 && (lineTrimmed === '' || str2 < line)) {
      output += str2
      added2 = true
    }

    if (!canAdd2 && lineTrimmed === '') {
      canAdd2 = true
    }

    output += line
  })

  return output
}

export function serviceFile(modelName: string): string {
  return `import DataService from './DataService'
import ${modelName}, { New${modelName}ModelFields, Updated${modelName}ModelFields } from '../models/${modelName}'

interface ${modelName}Service extends DataService<
  ${modelName},
  New${modelName}ModelFields,
  Updated${modelName}ModelFields
> {}

export default ${modelName}Service
`
}

export function serviceProvderFile(modelName: string, buffer: Buffer): string {
  let added1 = false
  let added2 = false
  let canAdd2 = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str1 = `import ${modelName}Service from './${modelName}Service'\n`
  const str2 = `  get${modelName}Service(): ${modelName}Service\n`

  lines.forEach(line => {
    const lineTrimmed = line.trim()

    if (!added1 && (lineTrimmed === '' || str1 < line)) {
      output += str1
      added1 = true
    }

    if (canAdd2 && !added2 && (line === '}' || str2 < line)) {
      output += str2
      added2 = true
    }

    if (!canAdd2 && lineTrimmed.startsWith('init')) {
      canAdd2 = true
    }

    output += line
  })

  return output
}

export function serviceNameFile(modelName: string, buffer: Buffer): string {
  let added = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str = `  ${modelName} = 'service.${camelCase(modelName)}',\n`

  lines.forEach((line, index) => {
    if (!added && index !== 0 && (line === '}' || str < line)) {
      output += str
      added = true
    }

    output += line
  })

  return output
}

export function servicesUtilFile(modelName: string, buffer: Buffer): string {
  let added = false
  let canAdd = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str = `  Container.set(ServiceName.${modelName}, serviceProvider.get${modelName}Service())\n`

  lines.forEach(line => {
    if (canAdd && !added && (line === '}' || str < line)) {
      output += str
      added = true
    }

    if (line.includes('registerServices')) {
      canAdd = true
    }

    output += line
  })

  return output
}

export function servicesIndexFile(modelName: string, buffer: Buffer): string {
  let added = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str = `export { default as ${modelName}Service } from './${modelName}Service'\n`

  lines.forEach(line => {
    const lineTrimmed = line.trim()

    if (!added && (lineTrimmed === '' || str < line)) {
      output += str
      added = true
    }

    output += line
  })

  return output
}

export function graphQLTypeFile(modelName: string): string {
  const camelCaseName = camelCase(modelName)
  return `import { Field, ObjectType } from 'type-graphql'

import ModelType from './ModelType'
import { ${modelName} } from '../../models'

@ObjectType()
class ${modelName}Type extends ModelType {
  constructor(${camelCaseName}: ${modelName}) {
    super(${camelCaseName})
  }
}

export default ${modelName}Type
`
}

export function graphQLTypesIndexFile(modelName: string, buffer: Buffer): string {
  let added = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str = `export { default as ${modelName}Type } from './${modelName}Type'\n`

  lines.forEach(line => {
    const lineTrimmed = line.trim()

    if (!added && (lineTrimmed === '' || str < line)) {
      output += str
      added = true
    }

    output += line
  })

  return output
}

export function graphQLResolverFile(modelName: string, modelNamePlural: string): string {
  const camelCaseName = camelCase(modelName)
  const camelCaseNamePlural = camelCase(modelNamePlural)
  const firstLetter = camelCaseNamePlural[0]

  return `import { Arg, ID, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'

import { ${modelName}Service, ServiceName } from '../../services'
import { ${modelName}Type } from '../'

@Service()
@Resolver(${modelName}Type)
class ${modelName}Resolver {
  constructor(@Inject(ServiceName.${modelName}) private readonly ${camelCaseName}Service: ${modelName}Service) {}

  @Query(returns => ${modelName}Type, { nullable: true })
  public async ${camelCaseName}(@Arg('id', type => ID) id: string): Promise<${modelName}Type | undefined> {
    const ${camelCaseName} = await this.${camelCaseName}Service.findById(id)
    return ${camelCaseName}?.toGraphQLType()
  }

  @Query(returns => [${modelName}Type])
  public async ${camelCaseNamePlural}(): Promise<${modelName}Type[]> {
    const ${camelCaseNamePlural} = await this.${camelCaseName}Service.findAll()
    return ${camelCaseNamePlural}.map(${firstLetter} => ${firstLetter}.toGraphQLType())
  }
}

export default ${modelName}Resolver
`
}

export function graphQLResolversIndexFile(modelName: string, buffer: Buffer): string {
  let added = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str = `export { default as ${modelName}Resolver } from './${modelName}Resolver'\n`

  lines.forEach(line => {
    const lineTrimmed = line.trim()

    if (!added && (lineTrimmed === '' || str < line)) {
      output += str
      added = true
    }

    output += line
  })

  return output
}

export function mongoDbFile(modelName: string, modelNamePlural: string, buffer: Buffer): string {
  let added1 = false
  let added2 = false
  let canAdd1 = false
  let canAdd2 = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const camelCaseNamePlural = camelCase(modelNamePlural)
  const str1 = `  ${modelNamePlural} = '${camelCaseNamePlural}',\n`
  const str2 = `  public get ${camelCaseNamePlural}(): Collection {
    return this.db.collection(CollectionName.${modelNamePlural})
  }\n\n`

  lines.forEach(line => {
    if (canAdd1 && !added1 && (line === '}' || str1 < line)) {
      output += str1
      added1 = true
    }

    if (!canAdd1 && line.includes('CollectionName')) {
      canAdd1 = true
    }

    if (!canAdd2 && line.includes(': Collection {')) {
      canAdd2 = true
    }

    if (canAdd2 && !added2) {
      if (line.includes('public')) {
        if (line.includes(': Collection {')) {
          if (str2 < line) {
            output += str2
            added2 = true
          }
        } else {
          output += str2
          added2 = true
        }
      }
    }

    output += line
  })

  return output
}

export function mongoServiceFile(modelName: string, modelNamePlural: string): string {
  const camelCaseNamePlural = camelCase(modelNamePlural)

  return `import { Service } from 'typedi'

import ${modelName}, { New${modelName}ModelFields, Updated${modelName}ModelFields } from '../models/${modelName}'
import MongoDb from './MongoDb'
import { ${modelName}Service } from '../services'

@Service()
class Mongo${modelName}Service implements ${modelName}Service {
  constructor(private readonly db: MongoDb) {}

  public deleteById(id: string): Promise<${modelName}> {
    return MongoDb.deleteById(id, this.db.${camelCaseNamePlural}, ${modelName}.fromMongo)
  }

  public findAll(): Promise<${modelName}[]> {
    return MongoDb.findAll(this.db.${camelCaseNamePlural}, ${modelName}.fromMongo)
  }

  public findById(id: string): Promise<${modelName} | null> {
    return MongoDb.findById(id, this.db.${camelCaseNamePlural}, ${modelName}.fromMongo)
  }

  public insertOne(fields: New${modelName}ModelFields): Promise<${modelName}> {
    return MongoDb.insertOne(fields, this.db.${camelCaseNamePlural}, ${modelName}.fromMongo)
  }

  public async updateById(id: string, fields: Updated${modelName}ModelFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<${modelName}> {
    return MongoDb.updateById(id, fields, this.db.${camelCaseNamePlural}, ${modelName}.fromMongo, options)
  }
}

export default Mongo${modelName}Service
`
}

export function mongoServiceProviderFile(modelName: string, buffer: Buffer): string {
  let added1 = false
  let added2 = false
  let canAdd1 = false
  let canAdd2 = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str1 = `import Mongo${modelName}Service from './Mongo${modelName}Service'\n`
  const str2 = `  public get${modelName}Service(): Mongo${modelName}Service {
    return Container.get(Mongo${modelName}Service)
  }\n`

  lines.forEach(line => {
    const lineTrimmed = line.trim()

    if (!canAdd1 && line.includes('import Mongo')) {
      canAdd1 = true
    }

    if (canAdd1 && !added1 && (lineTrimmed === '' || str1 < line)) {
      output += str1
      added1 = true
    }

    if (!canAdd2 && line.includes('public get')) {
      canAdd2 = true
    }

    if (canAdd2 && !added2) {
      if (line.includes('public get') && str2 < line) {
        output += str2 + '\n'
        added2 = true
      } else if (line.trimRight() === '}') {
        output += '\n\n' + str2
        added2 = true
      }
    }

    output += line
  })

  return output
}
