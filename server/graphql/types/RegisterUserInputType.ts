import { Field, InputType } from 'type-graphql'
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'

@InputType()
class RegisterUserInputType {
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

export default RegisterUserInputType
