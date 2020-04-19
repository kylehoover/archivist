import { Field, InputType } from 'type-graphql'
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator'

@InputType()
class SubmitRegistrationRequestInputType {
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

export default SubmitRegistrationRequestInputType
