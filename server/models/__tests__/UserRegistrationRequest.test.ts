import 'reflect-metadata'

import UserRegistrationRequest, {
  MongoUserRegistrationRequestModelFields,
} from '../UserRegistrationRequest'
import { UserRegistrationRequestType } from '../../graphql/types'

describe('UserRegistrationRequest', () => {
  test('fromMongo returns a new UserRegistrationRequest object', () => {
    const doc: MongoUserRegistrationRequestModelFields = {
      _id: '1',
      createdAt: new Date(),
      modifiedAt: new Date(),
      name: 'Name',
      email: 'email@email.com',
      password: 'password',
    }
    const registrationRequest = new UserRegistrationRequest(
      doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.email, doc.password
    )
    expect(UserRegistrationRequest.fromMongo(doc)).toEqual(registrationRequest)
  })

  test('toGraphQLType converts a UserRegistrationRequest into a UserRegistrationRequestType', () => {
    const registrationRequest = new UserRegistrationRequest(
      '1', new Date(), new Date(), 'Name', 'email@email.com', 'password'
    )
    const registrationRequestType = new UserRegistrationRequestType(registrationRequest)
    expect(registrationRequest.toGraphQLType()).toEqual(registrationRequestType)
  })
})
