export interface ModelFields {
  id: string
  createdAt: Date
  modifiedAt: Date
}

export abstract class Model {
  public readonly id: string
  public createdAt?: Date
  public modifiedAt?: Date

  constructor(fields: ModelFields) {
    this.id = fields.id
    this.createdAt = fields.createdAt
    this.modifiedAt = fields.modifiedAt
  }
}
