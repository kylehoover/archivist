import { Field, ID, ObjectType } from 'type-graphql'

import ModelType from './ModelType'
import { UserRegistrationInvitation } from '../../models'

@ObjectType()
class UserRegistrationInvitationType extends ModelType {
  @Field()
  public email: string

  @Field(type => ID)
  public invitationId: string

  constructor(registrationInvitation: UserRegistrationInvitation) {
    super(registrationInvitation)
    this.email = registrationInvitation.email
    this.invitationId = registrationInvitation.invitationId
  }
}

export default UserRegistrationInvitationType
