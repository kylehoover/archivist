import { ObjectId } from 'mongodb'

import { ModelType } from '../graphql/types'

export type ModelFields = {
  id: string
  createdAt: Date
  modifiedAt: Date
}

export type MongoModelFields = {
  _id: string
  createdAt: Date
  modifiedAt: Date
}

export type NewModelFields = {
  createdAt: Date
  modifiedAt: Date
}

export type UpdatedModelFields = {
  modifiedAt: Date
}

export function withNewModelFields<T>(fields: T): NewModelFields & T {
  const date = new Date()

  return {
    createdAt: date,
    modifiedAt: date,
    ...fields,
  }
}

export function withUpdatedModelFields<T>(fields: T): UpdatedModelFields & T {
  return {
    modifiedAt: new Date(),
    ...fields,
  }
}

abstract class Model {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly modifiedAt: Date
  ) {
    if ((id as any) instanceof ObjectId) {
      this.id = id.toString()
    }
  }

  public abstract toGraphQLType(): ModelType
}

export default Model
