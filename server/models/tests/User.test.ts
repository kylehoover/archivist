import 'reflect-metadata'

import DataProvider from '../../DataProvider'
import User, { MongoUserModelFields } from '../User'
import UserRole from '../UserRole'
import { UserType } from '../../graphql/types'

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
    }
    const user = new User(
      doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.email, doc.roleId, doc.password
    )
    expect(User.fromMongo(doc)).toEqual(user)
  })

  test('getRole returns the UserRole related to the User', () => {
    const user = new User('1', new Date(), new Date(), 'Name', 'email@email.com', '1', 'password')
    expect(user.getRole()).toEqual(userRole)
  })

  test('toGraphQLType returns a User as a UserType', () => {
    const user = new User('1', new Date(), new Date(), 'Name', 'email@email.com', '1', 'password')
    const userType = new UserType(user)
    expect(user.toGraphQLType()).toEqual(userType)
  })
})
