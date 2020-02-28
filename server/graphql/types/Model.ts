import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
abstract class Model {
  @Field(type => ID)
  public get id(): string {
    return this.identifier
  }

  public set id(id: string) {
    this.identifier = id
  }

  public set _id(id: string) {
    this.identifier = id
  }

  @Field()
  public createdAt!: Date

  @Field()
  public modifiedAt!: Date

  private identifier!: string
}

export default Model
