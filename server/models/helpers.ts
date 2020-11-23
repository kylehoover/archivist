import Joi from 'joi'
import { DateFields, ModifiedAt } from './types'

export function validateFields(fields: any, schema: Joi.ObjectSchema): void {
  const { error } = schema.validate(fields)

  if (error !== undefined) {
    throw error
  }
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
