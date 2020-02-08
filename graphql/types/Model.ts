import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
class Model {
  @Field(type => ID)
  public get id(): string {
    return this.identifier
  }

  @Field()
  public createdAt!: Date

  @Field()
  public modifiedAt!: Date

  private identifier!: string

  public set _id(id: string) {
    this.identifier = id
  }

  public set id(id: string) {
    this.identifier = id
  }
}

export default Model
