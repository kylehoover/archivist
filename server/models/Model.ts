import { ModelType } from '../graphql/types'

abstract class Model {
  protected constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly modifiedAt: Date
  ) {}

  public abstract toGraphQLType(): ModelType
}

export default Model
