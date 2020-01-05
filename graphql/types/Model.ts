import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
class Model {
  private identifier!: string

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
}

export default Model
