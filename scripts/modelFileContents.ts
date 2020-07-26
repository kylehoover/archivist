import { camelCase } from 'change-case'

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

export function servicesIndex(modelName: string): string {
  return `export { default as ${modelName}Service } from './${modelName}Service'\n`
}

export function serviceNameFile(modelName: string, buffer: Buffer): string {
  let added = false
  let output = ''
  const lines = buffer.toString().split('\n')

  lines.forEach((line, index) => {
    const firstSymbol = line.split('\s')[0].trim()

    if (!added && index !== 0 && (firstSymbol === '}' || modelName < firstSymbol)) {
      output += `  ${modelName} = 'service.${camelCase(modelName)}',\n`
      added = true
    }

    output += line
  })

  return output
}

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

export function modelsIndex(modelName: string): string {
  return `export { default as ${modelName} } from './${modelName}'
export * from './${modelName}'
`
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

export function graphQLTypesIndex(modelName: string): string {
  return `export { default as ${modelName}Type } from './${modelName}Type'\n`
}

export function graphQLResolverFile(modelName: string): string {
  const camelCaseName = camelCase(modelName)
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
  public async ${camelCaseName}s(): Promise<${modelName}Type[]> {
    const ${camelCaseName}s = await this.${camelCaseName}Service.findAll()
    return ${camelCaseName}s.map(c => c.toGraphQLType())
  }
}

export default ${modelName}Resolver
`
}

export function graphQLResolversIndex(modelName: string): string {
  return `export { default as ${modelName}Resolver } from './${modelName}Resolver'\n`
}
