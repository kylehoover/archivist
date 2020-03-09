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

abstract class Model {
  protected constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly modifiedAt: Date
  ) {}

  public static get newModelFields(): NewModelFields {
    return {
      createdAt: new Date(),
      modifiedAt: new Date(),
    }
  }

  public static getNewModelFields<T>(fields: T): NewModelFields & T {
    return {
      createdAt: new Date(),
      modifiedAt: new Date(),
      ...fields,
    }
  }

  public abstract toGraphQLType(): ModelType
}

export default Model
