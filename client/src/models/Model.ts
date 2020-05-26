class Model {
  public readonly id: string
  public createdAt?: Date
  public modifiedAt?: Date

  constructor(id: string, createdAt?: Date, modifiedAt?: Date) {
    this.id = id
    this.createdAt = createdAt
    this.modifiedAt = modifiedAt
  }
}

export default Model
