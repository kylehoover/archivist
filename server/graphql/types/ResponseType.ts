import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class ResponseType {
  @Field()
  public message: string

  constructor(message: string) {
    this.message = message
  }
}

export default ResponseType
