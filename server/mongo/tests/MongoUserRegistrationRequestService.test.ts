import 'reflect-metadata'

import { ObjectId } from 'mongodb'

import MongoDb from '../MongoDb'
import MongoUserRegistrationRequestService from '../MongoUserRegistrationRequestService'
import UserRegistrationRequest, {
  MongoUserRegistrationRequestModelFields,
  UserRegistrationRequestFields,
} from '../../models/UserRegistrationRequest'
import { Model } from '../../models'

const db = new MongoDb()
const registrationRequestService = new MongoUserRegistrationRequestService(db)
let initialRequests: UserRegistrationRequest[] = []
const data: UserRegistrationRequestFields[] = []

for (let i = 0; i < 5; i++) {
  data.push({ name: `Name${i}`, email: `email${i}@email.com`, password: `password${i}` })
}

beforeAll(async () => {
  await db.initForTesting()
})

afterAll(async () => {
  await db.close()
})

beforeEach(async () => {
  const result = await db.userRegistrationRequests.insertMany(
    data.map(request => Model.getNewModelFields(request))
  )
  initialRequests = result.ops.map(UserRegistrationRequest.fromMongo)
})

afterEach(async () => {
  await db.userRegistrationRequests.deleteMany({})
})

describe('MongoUserRegistrationRequestService', () => {
  test('deleteById removes a document from the userRegistrationRequests collection', async () => {
    const id = initialRequests[0].id
    const request = await registrationRequestService.deleteById(id)
    const requests = await db.userRegistrationRequests.find().map(UserRegistrationRequest.fromMongo).toArray()
    const deletedRequest = requests.find(i => i.id === id)
    expect(request).toEqual(initialRequests[0])
    expect(deletedRequest).toBeUndefined()
    expect(requests).toEqual(initialRequests.filter(as => as.id !== id))
  })

  test('findAll returns all documents in the userRegistrationRequests collection', async () => {
    const requests = await registrationRequestService.findAll()
    expect(requests).toEqual(initialRequests)
  })

  test('findById returns a UserRegistrationRequest object if the id exists', async () => {
    const request = await registrationRequestService.findById(initialRequests[0].id)
    expect(request).toEqual(initialRequests[0])
  })

  test('findById returns null if the id does not exist', async () => {
    const request = await registrationRequestService.findById((new ObjectId()).toHexString())
    expect(request).toBeNull()
  })

  test('insertOne adds a new document to the userRegistrationRequests collection', async () => {
    const registrationRequestFields = Model.getNewModelFields({
      name: 'New Name',
      email: 'newemail@email.com',
      password: 'newpassword',
    })
    const request = await registrationRequestService.insertOne(registrationRequestFields)
    const fieldsAsModel = UserRegistrationRequest.fromMongo(
      registrationRequestFields as MongoUserRegistrationRequestModelFields
    )
    const requests = await db.userRegistrationRequests.find().map(UserRegistrationRequest.fromMongo).toArray()
    const insertedCampaign = requests.find(as => as.id === fieldsAsModel.id)
    expect(request).toEqual(fieldsAsModel)
    expect(insertedCampaign).toEqual(fieldsAsModel)
    expect(requests).toEqual([...initialRequests, fieldsAsModel])
  })

  test('updateById updates a document in the userRegistrationRequests collection', async () => {
    const request = initialRequests[0]
    const updatedFields = Model.getUpdatedModelFields({ name: 'Updated Name' })
    const updatedRequest = await registrationRequestService.updateById(request.id, updatedFields)
    const requests = await db.userRegistrationRequests.find().map(UserRegistrationRequest.fromMongo).toArray()
    const updatedRequestFromDb = requests.find(as => as.id === request.id)
    const updatedInitialRequests = initialRequests.map(as => as.id === request.id ? updatedRequest : as)
    expect(updatedRequest.id).toEqual(request.id)
    expect(updatedRequest.createdAt).toEqual(request.createdAt)
    expect(updatedRequest.modifiedAt).toEqual(updatedFields.modifiedAt)
    expect(updatedRequest.name).toEqual(updatedFields.name)
    expect(updatedRequest.email).toEqual(request.email)
    expect(updatedRequestFromDb).toEqual(updatedRequest)
    expect(requests).toEqual(updatedInitialRequests)
  })
})
