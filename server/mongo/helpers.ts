import Joi from 'joi'
import { ObjectId } from 'mongodb'

import { ModelFields } from '../models'

export function docToFields <T extends ModelFields>(doc: any, schema: Joi.ObjectSchema): T {
  const { error } = schema.validate(doc)

  if (error !== undefined) {
    throw error
  }

  const { _id, ...fields } = doc

  return {
    id: (_id as ObjectId).toHexString(),
    ...fields,
  }
}

export function objectIdValidator(value: any): ObjectId {
  if (!(value instanceof ObjectId) || !ObjectId.isValid(value)) {
    throw new Error('_id must be a valid ObjectId')
  }

  return value
}

export const modelSchema = Joi.object({
  _id: Joi.custom(objectIdValidator).required(),
  createdAt: Joi.date().required(),
  modifiedAt: Joi.date().required(),
})
