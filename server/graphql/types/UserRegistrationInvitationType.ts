import { Field, ObjectType } from 'type-graphql'

import ModelType from './ModelType'
import { UserRegistrationInvitation } from '../../models'

@ObjectType()
class UserRegistrationInvitationType extends ModelType {
  @Field()
  public email: string

  constructor(registrationInvitation: UserRegistrationInvitation) {
    super(registrationInvitation)
    this.email = registrationInvitation.email
  }
}

export default UserRegistrationInvitationType
