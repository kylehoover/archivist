import 'reflect-metadata'
import { UserRole, UserRolesMap } from '../UserRole'

const defaultUserRole = new UserRole({
  id: '1',
  createdAt: new Date(),
  modifiedAt: new Date(),
  name: 'Name',
  isDefault: true,
  isReadonly: false,
  permissions: {
    canApproveUserRegistrationRequests: false,
    canEditAppSettings: false,
    canEditUserRoles: false,
    canInviteUsers: false,
  },
})

const userRole = new UserRole({
  id: '2',
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

describe('UserRole', () => {
  test('getDefaultRoleFromList returns the default UserRole in the list if it exists and is the only one', () => {
    const userRoles = [userRole, defaultUserRole]
    const expected = defaultUserRole
    const result = UserRole.getDefaultRoleFromList(userRoles)
    expect(result).toEqual(expected)
  })

  test('getDefaultRoleFromList throws an error if no UserRole in the list is the default', () => {
    const userRoles = [userRole]
    expect(() => UserRole.getDefaultRoleFromList(userRoles)).toThrowError()
  })

  test('getDefaultRoleFromList throws an error if more than one UserRole in the list is the default', () => {
    const userRoles = [defaultUserRole, defaultUserRole]
    expect(() => UserRole.getDefaultRoleFromList(userRoles)).toThrowError()
  })

  test('listToMap converts a UserRole list to a UserRolesMap', () => {
    const userRoles = [defaultUserRole, userRole]
    const expected: UserRolesMap = {
      [defaultUserRole.id]: defaultUserRole,
      [userRole.id]: userRole,
    }
    const result = UserRole.listToMap(userRoles)
    expect(result).toEqual(expected)
  })
})
