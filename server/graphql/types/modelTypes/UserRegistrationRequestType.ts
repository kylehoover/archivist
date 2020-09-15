import { Field, ObjectType } from 'type-graphql'

import ModelType from './ModelType'
import { UserRegistrationRequest } from '../../../models'

@ObjectType()
class UserRegistrationRequestType extends ModelType {
  @Field()
  public email: string

  @Field()
  public name: string

  constructor(registrationRequest: UserRegistrationRequest) {
    super(registrationRequest)
    this.email = registrationRequest.email
    this.name = registrationRequest.name
  }
}

export default UserRegistrationRequestType
