// import 'reflect-metadata'

// import UserRegistrationInvitation, {
//   MongoUserRegistrationInvitationModelFields,
// } from '../UserRegistrationInvitation'
// import { UserRegistrationInvitationType } from '../../graphql/types'

// describe('UserRegistrationInvitation', () => {
//   test('fromMongo returns a new UserRegistrationInvitation object', () => {
//     const doc: MongoUserRegistrationInvitationModelFields = {
//       _id: '1',
//       createdAt: new Date(),
//       modifiedAt: new Date(),
//       email: 'email@email.com',
//       invitationId: '1',
//       invitedByUserId: '1',
//       expiresAt: new Date(),
//     }
//     const registrationInvitation = new UserRegistrationInvitation(
//       doc._id, doc.createdAt, doc.modifiedAt, doc.email, doc.invitationId, doc.invitedByUserId, doc.expiresAt
//     )
//     expect(UserRegistrationInvitation.fromMongo(doc)).toEqual(registrationInvitation)
//   })

//   test('toGraphQLType converts a UserRegistrationInvitation into a UserRegistrationInvitationType', () => {
//     const registrationInvitation = new UserRegistrationInvitation(
//       '1', new Date(), new Date(), 'email@email.com', '1', '1', new Date()
//     )
//     const registrationInvitationType = new UserRegistrationInvitationType(registrationInvitation)
//     expect(registrationInvitation.toGraphQLType()).toEqual(registrationInvitationType)
//   })
// })
