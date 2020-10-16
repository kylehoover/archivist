import 'reflect-metadata'
import DataProvider from '../../DataProvider'
import { RegistrationType, User } from '../User'
import { UserRole } from '../UserRole'

const userRole = new UserRole({
  id: '1',
  createdAt: new Date(),
  modifiedAt: new Date(),
  name: 'Name',
  isDefault: false,
  isReadonly: false,
  permissions: {
    canApproveUserRegistrationRequests: false,
    canEditAppSettings: false,
    canEditUserRoles: false,
    canInviteUsers: false,
  },
})

describe('User', () => {
  test('role accessor returns the UserRole related to the User', () => {
    const user = new User({
      id: '1',
      createdAt: new Date(),
      modifiedAt: new Date(),
      name: 'Name',
      email: 'email@email.com',
      roleId: '1',
      password: 'password',
      registration: {
        type: RegistrationType.OpenRegistration,
      },
    })
    const spy = jest.spyOn(DataProvider, 'getUserRoleById')
    spy.mockReturnValue(userRole)
    expect(user.role).toEqual(userRole)
  })
})
