import 'reflect-metadata'

import DataProvider from '../../DataProvider'
import User, { MongoUserModelFields, RegistrationInfo, RegistrationType } from '../User'
import UserRole from '../UserRole'
import { UserType } from '../../graphql/types'

const registrationInfo: RegistrationInfo = {
  type: RegistrationType.OpenRegistration,
}

const userRole = new UserRole('1', new Date(), new Date(), 'User Role Name', false, false, {
  canAcceptUserRegistrationRequests: false,
  canEditAppSettings: false,
  canEditUserRoles: false,
  canInviteUsers: false,
})

beforeAll(() => {
  jest.spyOn(DataProvider, 'getUserRoleById').mockImplementation(id => userRole)
})

afterAll(() => {
  jest.spyOn(DataProvider, 'getUserRoleById').mockRestore()
})

describe('User', () => {
  test('fromMongo returns a new User object', () => {
    const doc: MongoUserModelFields = {
      _id: '1',
      createdAt: new Date(),
      modifiedAt: new Date(),
      name: 'Name',
      email: 'email@email.com',
      roleId: '1',
      password: 'password',
      registration: registrationInfo,
    }
    const user = new User(
      doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.email, doc.roleId, doc.password, doc.registration
    )
    expect(User.fromMongo(doc)).toEqual(user)
  })

  test('role accessor returns the UserRole related to the User', () => {
    const user = new User(
      '1', new Date(), new Date(), 'Name', 'email@email.com', '1', 'password', registrationInfo
    )
    expect(user.role).toEqual(userRole)
  })

  test('toGraphQLType converts a User into a UserType', () => {
    const user = new User(
      '1', new Date(), new Date(), 'Name', 'email@email.com', '1', 'password', registrationInfo
    )
    const userType = new UserType(user)
    expect(user.toGraphQLType()).toEqual(userType)
  })
})
