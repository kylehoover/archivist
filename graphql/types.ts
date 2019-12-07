// tslint:disable: arrow-parens
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Campaign {
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

  // @Field(type => ID)
  // public id!: string

  @Field()
  public name!: string
}
