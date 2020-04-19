import 'reflect-metadata'

import { ObjectId } from 'mongodb'

import MongoUserRoleService from '../MongoUserRoleService'
import MongoDb from '../MongoDb'
import UserRole, { MongoUserRoleModelFields, defaultUserRoles } from '../../models/UserRole'
import { Model } from '../../models'

const db = new MongoDb()
const userRoleService = new MongoUserRoleService(db)
let initialUserRoles: UserRole[] = []

beforeAll(async () => {
  await db.initForTesting()
})

afterAll(async () => {
  await db.close()
})

beforeEach(async () => {
  const result = await db.userRoles.insertMany(defaultUserRoles.map(role => Model.getNewModelFields(role)))
  initialUserRoles = result.ops.map(UserRole.fromMongo)
})

afterEach(async () => {
  await db.userRoles.deleteMany({})
})

describe('MongoUserRoleService', () => {
  test('deleteById removes a document from the userRoles collection if the id exists', async () => {
    const id = initialUserRoles[0].id
    const userRole = await userRoleService.deleteById(id)
    const userRoles = await db.userRoles.find().map(UserRole.fromMongo).toArray()
    const deletedUserRole = userRoles.find(setting => setting.id === id)
    expect(userRole).toEqual(initialUserRoles[0])
    expect(deletedUserRole).toBeUndefined()
    expect(userRoles).toEqual(initialUserRoles.filter(as => as.id !== id))
  })

  test('deleteById throws an error if the id does not exist', async () => {
    const userRolePromise = userRoleService.deleteById((new ObjectId()).toHexString())
    await expect(userRolePromise).rejects.toThrowError()
    const userRoles = await db.userRoles.find().map(UserRole.fromMongo).toArray()
    expect(userRoles).toEqual(initialUserRoles)
  })

  test('findAll returns all documents in the userRoles collection', async () => {
    const userRoles = await userRoleService.findAll()
    expect(userRoles).toEqual(initialUserRoles)
  })

  test('findById returns a UserRole object if the id exists', async () => {
    const userRole = await userRoleService.findById(initialUserRoles[0].id)
    expect(userRole).toEqual(initialUserRoles[0])
  })

  test('findById returns null if the id does not exist', async () => {
    const userRole = await userRoleService.findById((new ObjectId()).toHexString())
    expect(userRole).toBeNull()
  })

  test('findDefaultRole returns the default UserRole', async () => {
    const defaultRoleFromService = await userRoleService.findDefaultRole()
    const defaultRole = initialUserRoles.find(role => role.isDefault)
    expect(defaultRoleFromService).toEqual(defaultRole)
  })

  test('insertOne adds a new document to the userRoles collection', async () => {
    const userRoleFields = Model.getNewModelFields({
      name: 'New User Role',
      isDefault: false,
      isReadonly: false,
      permissions: {
        canAcceptUserRegistrationRequests: false,
        canEditAppSettings: true,
        canEditUserRoles: true,
        canInviteUsers: false,
      },
    })
    const userRole = await userRoleService.insertOne(userRoleFields)
    const fieldsAsModel = UserRole.fromMongo(userRoleFields as MongoUserRoleModelFields)
    const userRoles = await db.userRoles.find().map(UserRole.fromMongo).toArray()
    const insertedUserRole = userRoles.find(as => as.id === fieldsAsModel.id)
    expect(userRole).toEqual(fieldsAsModel)
    expect(insertedUserRole).toEqual(fieldsAsModel)
    expect(userRoles).toEqual([...initialUserRoles, fieldsAsModel])
  })

  test('updateById updates a document in the userRoles collection if the id exists', async () => {
    const userRole = initialUserRoles[0]
    const updatedFields = Model.getUpdatedModelFields({ name: 'Updated Name', isReadonly: true })
    const updatedUserRole = await userRoleService.updateById(userRole.id, updatedFields)
    const userRoles = await db.userRoles.find().map(UserRole.fromMongo).toArray()
    const updatedUserRoleFromDb = userRoles.find(as => as.id === userRole.id)
    const updatedInitialUserRoles = initialUserRoles.map(as => as.id === userRole.id ? updatedUserRole : as)
    expect(updatedUserRole.id).toEqual(userRole.id)
    expect(updatedUserRole.createdAt).toEqual(userRole.createdAt)
    expect(updatedUserRole.modifiedAt).toEqual(updatedFields.modifiedAt)
    expect(updatedUserRole.name).toEqual(updatedFields.name)
    expect(updatedUserRole.isDefault).toEqual(userRole.isDefault)
    expect(updatedUserRole.isReadonly).toEqual(updatedFields.isReadonly)
    expect(updatedUserRole.permissions).toEqual(userRole.permissions)
    expect(updatedUserRoleFromDb).toEqual(updatedUserRole)
    expect(userRoles).toEqual(updatedInitialUserRoles)
  })

  test('updateById throws an error if the id does not exist', async () => {
    const updatedFields = Model.getUpdatedModelFields({ name: 'Updated Name' })
    const userRolePromise = userRoleService.updateById((new ObjectId()).toHexString(), updatedFields)
    await expect(userRolePromise).rejects.toThrowError()
    const userRoles = await db.userRoles.find().map(UserRole.fromMongo).toArray()
    expect(userRoles).toEqual(initialUserRoles)
  })
})
