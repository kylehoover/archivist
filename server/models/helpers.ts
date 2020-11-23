import { DateFields, ModifiedAt } from './types'

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
