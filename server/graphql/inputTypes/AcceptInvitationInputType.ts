import { Field, InputType } from 'type-graphql'
import { IsNotEmpty, MaxLength } from 'class-validator'

@InputType()
class AcceptInvitationInputType {
  @Field()
  @IsNotEmpty()
  public invitationId!: string

  @Field()
  @IsNotEmpty()
  @MaxLength(50)
  public name!: string

  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  public password!: string
}

export default AcceptInvitationInputType
