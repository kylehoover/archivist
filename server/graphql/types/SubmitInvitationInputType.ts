import { Field, InputType } from 'type-graphql'
import { IsEmail } from 'class-validator'

@InputType()
class SubmitInvitationInputType {
  @Field()
  @IsEmail()
  public email!: string
}

export default SubmitInvitationInputType
