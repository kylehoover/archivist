import 'reflect-metadata'

import { ObjectId } from 'mongodb'

import User, { MongoUserModelFields, UserFields } from '../../models/User'
import MongoUserService from '../MongoUserService'
import MongoDb from '../MongoDb'
import { Model } from '../../models'

const db = new MongoDb()
const userService = new MongoUserService(db)
let initialUsers: User[] = []
const data: UserFields[] = []

for (let i = 0; i < 5; i++) {
  data.push({ name: `Name ${i}`, email: `email${i}@email.com`, roleId: `${i}`, password: `password${i}` })
}

beforeAll(async () => {
  await db.initForTesting()
})

afterAll(async () => {
  await db.close()
})

beforeEach(async () => {
  const result = await db.users.insertMany(data.map(user => Model.getNewModelFields(user)))
  initialUsers = result.ops.map(User.fromMongo)
})

afterEach(async () => {
  await db.users.deleteMany({})
})

describe('MongoUserService', () => {
  test('deleteById removes a document from the users collection', async () => {
    const id = initialUsers[0].id
    const user = await userService.deleteById(id)
    const users = await db.users.find().map(User.fromMongo).toArray()
    const deletedUser = users.find(setting => setting.id === id)
    expect(user).toEqual(initialUsers[0])
    expect(deletedUser).toBeUndefined()
    expect(users).toEqual(initialUsers.filter(as => as.id !== id))
  })

  test('findAll returns all documents in the users collection', async () => {
    const users = await userService.findAll()
    expect(users).toEqual(initialUsers)
  })

  test('findById returns a User object if the id exists', async () => {
    const user = await userService.findById(initialUsers[0].id)
    expect(user).toEqual(initialUsers[0])
  })

  test('findById returns null if the id does not exist', async () => {
    const user = await userService.findById((new ObjectId()).toHexString())
    expect(user).toBeNull()
  })

  test('insertOne adds a new document to the users collection', async () => {
    const userFields = Model.getNewModelFields({
      name: 'New User',
      email: 'newemail@email.com',
      roleId: '12345',
      password: 'newpassword',
    })
    const user = await userService.insertOne(userFields)
    const fieldsAsModel = User.fromMongo(userFields as MongoUserModelFields)
    const users = await db.users.find().map(User.fromMongo).toArray()
    const insertedUser = users.find(as => as.id === fieldsAsModel.id)
    expect(user).toEqual(fieldsAsModel)
    expect(insertedUser).toEqual(fieldsAsModel)
    expect(users).toEqual([...initialUsers, fieldsAsModel])
  })

  test('updateById updates a document in the users collection', async () => {
    const user = initialUsers[0]
    const updatedFields = Model.getUpdatedModelFields({ name: 'Updated Name', roleId: '54321' })
    const updatedUser = await userService.updateById(user.id, updatedFields)
    const users = await db.users.find().map(User.fromMongo).toArray()
    const updatedUserFromDb = users.find(as => as.id === user.id)
    const updatedInitialUsers = initialUsers.map(as => as.id === user.id ? updatedUser : as)
    expect(updatedUser.id).toEqual(user.id)
    expect(updatedUser.createdAt).toEqual(user.createdAt)
    expect(updatedUser.modifiedAt).toEqual(updatedFields.modifiedAt)
    expect(updatedUser.name).toEqual(updatedFields.name)
    expect(updatedUser.email).toEqual(user.email)
    expect(updatedUser.roleId).toEqual(updatedFields.roleId)
    expect(updatedUserFromDb).toEqual(updatedUser)
    expect(users).toEqual(updatedInitialUsers)
  })
})
