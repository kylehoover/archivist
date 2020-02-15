import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
class RegisterUserInput {
  @Field()
  @IsEmail()
  public email!: string

  @Field()
  @IsNotEmpty()
  @MaxLength(50)
  public firstName!: string

  @Field({ nullable: true })
  @IsNotEmpty()
  @MaxLength(50)
  public lastName?: string
}

export default RegisterUserInput
