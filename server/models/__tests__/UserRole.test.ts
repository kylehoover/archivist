// import 'reflect-metadata'

// import UserRole, { MongoUserRoleModelFields, UserRolesMap, defaultUserRoles } from '../UserRole'
// import { UserRoleType } from '../../graphql/types'

// function getUserRoles(): UserRole[] {
//   return defaultUserRoles.map((fields, i) => new UserRole(
//     `${i}`, new Date(), new Date(), fields.name, fields.isDefault, fields.isReadonly, fields.permissions
//   ))
// }

// describe('UserRole', () => {
//   test('fromMongo returns a new UserRole object', () => {
//     const doc: MongoUserRoleModelFields = {
//       _id: '1',
//       createdAt: new Date(),
//       modifiedAt: new Date(),
//       ...defaultUserRoles[0],
//     }
//     const userRole = new UserRole(
//       doc._id, doc.createdAt, doc.modifiedAt, doc.name, doc.isDefault, doc.isReadonly, doc.permissions
//     )
//     expect(UserRole.fromMongo(doc)).toEqual(userRole)
//   })

//   test('getDefaultRoleFromList returns the default UserRole in the list if it exists and is the only one', () => {
//     const userRoles = getUserRoles()
//     const defaultRole = userRoles.find(role => role.isDefault)
//     expect(UserRole.getDefaultRoleFromList(userRoles)).toEqual(defaultRole)
//   })

//   test('getDefaultRoleFromList throws an error if no UserRole in the list is the default', () => {
//     const userRoles = getUserRoles().map(role => new UserRole(
//       role.id, role.createdAt, role.modifiedAt, role.name, false, role.isReadonly, role.permissions
//     ))
//     expect(() => UserRole.getDefaultRoleFromList(userRoles)).toThrowError()
//   })

//   test('getDefaultRoleFromList throws an error if more than one UserRole in the list is the default', () => {
//     const userRoles = getUserRoles().map(role => new UserRole(
//       role.id, role.createdAt, role.modifiedAt, role.name, true, role.isReadonly, role.permissions
//     ))
//     expect(() => UserRole.getDefaultRoleFromList(userRoles)).toThrowError()
//   })

//   test('listToMap converts a UserRole list to a UserRolesMap', () => {
//     const userRoles = getUserRoles()
//     const userRolesMap: UserRolesMap = {}
//     userRoles.forEach(role => { userRolesMap[role.id] = role })
//     expect(UserRole.listToMap(userRoles)).toEqual(userRolesMap)
//   })

//   test('toGraphQLType converts a UserRole into a UserRoleType', () => {
//     const userRole = new UserRole(
//       '1', new Date(), new Date(), 'Name', false, false, defaultUserRoles[0].permissions
//     )
//     const userRoleType = new UserRoleType(userRole)
//     expect(userRole.toGraphQLType()).toEqual(userRoleType)
//   })
// })
