import { ModelType } from '../graphql/types'

export interface ModifiedAt {
  modifiedAt: Date
}

export interface DateFields extends ModifiedAt {
  createdAt: Date
}

export interface ModelFields extends DateFields {
  id: string
}

export function withNewModelFields<T>(fields: T): T & DateFields {
  const date = new Date()

  return {
    createdAt: date,
    modifiedAt: date,
    ...fields,
  }
}

export function withUpdatedModelFields<T>(fields: T): T & ModifiedAt {
  return {
    modifiedAt: new Date(),
    ...fields,
  }
}

export abstract class Model {
  public readonly id: string
  public readonly createdAt: Date
  public readonly modifiedAt: Date

  constructor(fields: ModelFields) {
    this.id = fields.id
    this.createdAt = fields.createdAt
    this.modifiedAt = fields.modifiedAt
  }

  public abstract toGraphQLType(): ModelType
}
