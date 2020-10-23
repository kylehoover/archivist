import { camelCase } from 'change-case'

export function modelFile(modelName: string): string {
  return `import { DateFields, Model, ModelFields, ModifiedAt } from './Model'
import { ${modelName}Type } from '../graphql/types'

export interface ${modelName}Fields {

}

export interface ${modelName}ModelFields extends ${modelName}Fields, ModelFields {}
export interface New${modelName}Fields extends ${modelName}Fields, DateFields {}
export interface Updated${modelName}Fields extends Partial<${modelName}Fields>, ModifiedAt {}

export class ${modelName} extends Model {
  constructor(fields: ${modelName}ModelFields) {
    super(fields)
  }

  public toGraphQLType(): ${modelName}Type {
    return new ${modelName}Type(this)
  }
}
`
}

export function modelsIndexFile(modelName: string, buffer: Buffer): string {
  let added = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str = `export * from './${modelName}'\n`

  lines.forEach(line => {
    const lineTrimmed = line.trim()

    if (!added && (lineTrimmed === '' || str < line)) {
      output += str
      added = true
    }

    output += line + '\n'
  })

  return output.substring(0, output.length - 1)
}

export function serviceFile(modelName: string): string {
  return `import { DataService } from './DataService'
import { ${modelName}, New${modelName}Fields, Updated${modelName}Fields } from '../models'

export interface ${modelName}Service extends
  DataService<${modelName}, New${modelName}Fields, Updated${modelName}Fields> {}
`
}

export function serviceProvderFile(modelName: string, buffer: Buffer): string {
  let added1 = false
  let added2 = false
  let canAdd2 = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str1 = `import { ${modelName}Service } from './${modelName}Service'\n`
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

    output += line + '\n'
  })

  return output.substring(0, output.length - 1)
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

    output += line + '\n'
  })

  return output.substring(0, output.length - 1)
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

    output += line + '\n'
  })

  return output.substring(0, output.length - 1)
}

export function servicesIndexFile(modelName: string, buffer: Buffer): string {
  let added = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str = `export * from './${modelName}Service'\n`

  lines.forEach(line => {
    const lineTrimmed = line.trim()

    if (!added && (lineTrimmed === '' || str < line)) {
      output += str
      added = true
    }

    output += line + '\n'
  })

  return output.substring(0, output.length - 1)
}

export function graphQLTypeFile(modelName: string): string {
  const camelCaseName = camelCase(modelName)
  return `import { Field, ObjectType } from 'type-graphql'
import { ${modelName} } from '../../../models'
import { ModelType } from './ModelType'

@ObjectType()
export class ${modelName}Type extends ModelType {
  constructor(${camelCaseName}: ${modelName}) {
    super(${camelCaseName})
  }
}
`
}

export function graphQLTypesIndexFile(modelName: string, buffer: Buffer): string {
  let added = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str = `export * from './${modelName}Type'\n`

  lines.forEach(line => {
    const lineTrimmed = line.trim()

    if (!added && (lineTrimmed === '' || str < line)) {
      output += str
      added = true
    }

    output += line + '\n'
  })

  return output.substring(0, output.length - 1)
}

export function graphQLResolverFile(modelName: string, modelNamePlural: string): string {
  const camelCaseName = camelCase(modelName)
  const camelCaseNamePlural = camelCase(modelNamePlural)
  const firstLetter = camelCaseNamePlural[0]

  return `import { Arg, ID, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { ${modelName}Service, ServiceName } from '../../services'
import { Authorized } from '../decorators'
import { ${modelName}Type } from '../types'

@Service()
@Resolver(${modelName}Type)
export class ${modelName}Resolver {
  constructor(@Inject(ServiceName.${modelName}) private readonly ${camelCaseName}Service: ${modelName}Service) {}

  @Query(returns => ${modelName}Type, { nullable: true })
  @Authorized()
  public async ${camelCaseName}(@Arg('id', type => ID) id: string): Promise<${modelName}Type | undefined> {
    const ${camelCaseName} = await this.${camelCaseName}Service.findById(id)
    return ${camelCaseName}?.toGraphQLType()
  }

  @Query(returns => [${modelName}Type])
  @Authorized()
  public async ${camelCaseNamePlural}(): Promise<${modelName}Type[]> {
    const ${camelCaseNamePlural} = await this.${camelCaseName}Service.findAll()
    return ${camelCaseNamePlural}.map(${firstLetter} => ${firstLetter}.toGraphQLType())
  }
}
`
}

export function graphQLResolversIndexFile(modelName: string, buffer: Buffer): string {
  let added = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str = `export * from './${modelName}Resolver'\n`

  lines.forEach(line => {
    const lineTrimmed = line.trim()

    if (!added && (lineTrimmed === '' || str < line)) {
      output += str
      added = true
    }

    output += line + '\n'
  })

  return output.substring(0, output.length - 1)
}

export function mongoTypesFile(modelName: string, modelNamePlural: string, buffer: Buffer): string {
  let added = false
  let canAdd = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const camelCaseNamePlural = camelCase(modelNamePlural)
  const str = `  ${modelNamePlural} = '${camelCaseNamePlural}',\n`

  lines.forEach(line => {
    if (canAdd && !added && (line === '}' || str < line)) {
      output += str
      added = true
    }

    if (!canAdd && line.includes('CollectionName')) {
      canAdd = true
    }

    output += line + '\n'
  })

  return output.substring(0, output.length - 1)
}

export function mongoDbFile(modelName: string, modelNamePlural: string, buffer: Buffer): string {
  let added = false
  let canAdd = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const camelCaseNamePlural = camelCase(modelNamePlural)
  const str = `  public get ${camelCaseNamePlural}(): Collection {
    return this.db.collection(CollectionName.${modelNamePlural})
  }\n\n`

  lines.forEach(line => {
    if (!canAdd && line.includes(': Collection {')) {
      canAdd = true
    }

    if (canAdd && !added) {
      if (line.includes('public')) {
        if (line.includes(': Collection {')) {
          if (str < line) {
            output += str
            added = true
          }
        } else {
          output += str
          added = true
        }
      }
    }

    output += line + '\n'
  })

  return output.substring(0, output.length - 1)
}

export function mongoServiceFile(modelName: string, modelNamePlural: string): string {
  const camelCaseName = camelCase(modelName)
  const camelCaseNamePlural = camelCase(modelNamePlural)

  return `import Joi from 'joi'
import { Service } from 'typedi'
import { ${modelName}, ${modelName}ModelFields, New${modelName}Fields, Updated${modelName}Fields } from '../models/${modelName}'
import { ${modelName}Service } from '../services'
import { MongoDb, deleteById, findAll, findById, insertOne, updateById } from './MongoDb'
import { modelSchema } from './helpers'

const ${camelCaseName}Schema = modelSchema.keys({

})

@Service()
export class Mongo${modelName}Service implements ${modelName}Service {
  constructor(private readonly db: MongoDb) {}

  public async deleteById(id: string): Promise<${modelName}> {
    const doc = await deleteById<${modelName}ModelFields>(id, this.db.${camelCaseNamePlural}, ${camelCaseName}Schema)
    return new ${modelName}(doc)
  }

  public async findAll(): Promise<${modelName}[]> {
    const docs = await findAll<${modelName}ModelFields>(this.db.${camelCaseNamePlural}, ${camelCaseName}Schema)
    return docs.map(fields => new ${modelName}(fields))
  }

  public async findById(id: string): Promise<${modelName} | null> {
    const doc = await findById<${modelName}ModelFields>(id, this.db.${camelCaseNamePlural}, ${camelCaseName}Schema)
    return doc === null ? null : new ${modelName}(doc)
  }

  public async insertOne(fields: New${modelName}Fields): Promise<${modelName}> {
    const doc = await insertOne<${modelName}ModelFields>(fields, this.db.${camelCaseNamePlural}, ${camelCaseName}Schema)
    return new ${modelName}(doc)
  }

  public async updateById(id: string, fields: Updated${modelName}Fields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<${modelName}> {
    const doc = await updateById<${modelName}ModelFields>(
      id,
      fields,
      this.db.${camelCaseNamePlural},
      ${camelCaseName}Schema,
      options
    )
    return new ${modelName}(doc)
  }
}
`
}

export function mongoServiceProviderFile(modelName: string, buffer: Buffer): string {
  let added1 = false
  let added2 = false
  let canAdd2 = false
  let output = ''
  const lines = buffer.toString().split('\n')
  const str1 = `import { Mongo${modelName}Service } from './Mongo${modelName}Service'\n`
  const str2 = `  public get${modelName}Service(): Mongo${modelName}Service {
    return Container.get(Mongo${modelName}Service)
  }\n`

  lines.forEach(line => {
    const lineTrimmed = line.trim()

    if (!added1 && (lineTrimmed === '' || str1 < line)) {
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

    output += line + '\n'
  })

  return output.substring(0, output.length - 1)
}
