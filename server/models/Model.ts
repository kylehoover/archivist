import Joi from 'joi'
import { ModelType } from '../graphql/types'
import { DateFields } from './types'

export interface ModelFields extends DateFields {
  id: string
}

export const modelSchema = Joi.object({
  id: Joi.string().required(),
  createdAt: Joi.date().required(),
  modifiedAt: Joi.date().required(),
})

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
