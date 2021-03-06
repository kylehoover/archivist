import { Field, InputType } from 'type-graphql'
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'

@InputType()
class LoginUserInputType {
  @Field()
  @IsEmail()
  public email!: string

  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  public password!: string
}

export default LoginUserInputType
