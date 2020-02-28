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
  public name!: string

  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  public password!: string
}

export default RegisterUserInput
