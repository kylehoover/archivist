import { ModelType } from '../graphql/types'
import { DateFields } from './types'

export interface ModelFields extends DateFields {
  id: string
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
