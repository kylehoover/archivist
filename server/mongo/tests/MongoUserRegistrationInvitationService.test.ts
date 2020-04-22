import 'reflect-metadata'

import { ObjectId } from 'mongodb'
import { v4 as uuid } from 'uuid'

import MongoDb from '../MongoDb'
import MongoUserRegistrationInvitationService from '../MongoUserRegistrationInvitationService'
import UserRegistrationInvitation, {
  MongoUserRegistrationInvitationModelFields,
  UserRegistrationInvitationFields,
} from '../../models/UserRegistrationInvitation'
import { withNewModelFields, withUpdatedModelFields } from '../../models/Model'

const db = new MongoDb()
const registrationInvitationService = new MongoUserRegistrationInvitationService(db)
let initialInvitations: UserRegistrationInvitation[] = []
const data: UserRegistrationInvitationFields[] = []

for (let i = 0; i < 5; i++) {
  data.push({ email: `email${i}@email.com`, invitationId: uuid(), invitedByUserId: '1', expiresAt: new Date() })
}

beforeAll(async () => {
  await db.initForTesting()
})

afterAll(async () => {
  await db.close()
})

beforeEach(async () => {
  const result = await db.userRegistrationInvitations.insertMany(
    data.map(invitation => withNewModelFields(invitation))
  )
  initialInvitations = result.ops.map(UserRegistrationInvitation.fromMongo)
})

afterEach(async () => {
  await db.userRegistrationInvitations.deleteMany({})
})

describe('MongoUserRegistrationInvitationService', () => {
  test('deleteById removes a document from the userRegistrationInvitations collection', async () => {
    const id = initialInvitations[0].id
    const invitation = await registrationInvitationService.deleteById(id)
    const invitations = await db.userRegistrationInvitations.find().map(UserRegistrationInvitation.fromMongo).toArray()
    const deletedInvitation = invitations.find(i => i.id === id)
    expect(invitation).toEqual(initialInvitations[0])
    expect(deletedInvitation).toBeUndefined()
    expect(invitations).toEqual(initialInvitations.filter(as => as.id !== id))
  })

  test('findAll returns all documents in the userRegistrationInvitations collection', async () => {
    const invitations = await registrationInvitationService.findAll()
    expect(invitations).toEqual(initialInvitations)
  })

  test('findById returns a UserRegistrationInvitation object if the id exists', async () => {
    const invitation = await registrationInvitationService.findById(initialInvitations[0].id)
    expect(invitation).toEqual(initialInvitations[0])
  })

  test('findById returns null if the id does not exist', async () => {
    const invitation = await registrationInvitationService.findById((new ObjectId()).toHexString())
    expect(invitation).toBeNull()
  })

  test('insertOne adds a new document to the userRegistrationInvitations collection', async () => {
    const invitationFields = withNewModelFields({
      email: 'newemail@email.com',
      invitationId: uuid(),
      invitedByUserId: '1',
      expiresAt: new Date(),
    })
    const invitation = await registrationInvitationService.insertOne(invitationFields)
    const fieldsAsModel = UserRegistrationInvitation.fromMongo(
      invitationFields as MongoUserRegistrationInvitationModelFields
    )
    const invitations = await db.userRegistrationInvitations.find().map(UserRegistrationInvitation.fromMongo).toArray()
    const insertedCampaign = invitations.find(as => as.id === fieldsAsModel.id)
    expect(invitation).toEqual(fieldsAsModel)
    expect(insertedCampaign).toEqual(fieldsAsModel)
    expect(invitations).toEqual([...initialInvitations, fieldsAsModel])
  })

  test('updateById updates a document in the userRegistrationInvitations collection', async () => {
    const invitation = initialInvitations[0]
    const updatedFields = withUpdatedModelFields({ invitationId: uuid(), expiresAt: new Date() })
    const updatedInvitation = await registrationInvitationService.updateById(invitation.id, updatedFields)
    const invitations = await db.userRegistrationInvitations.find().map(UserRegistrationInvitation.fromMongo).toArray()
    const updatedInvitationFromDb = invitations.find(as => as.id === invitation.id)
    const updatedInitialInvitations = initialInvitations.map(as => as.id === invitation.id ? updatedInvitation : as)
    expect(updatedInvitation.id).toEqual(invitation.id)
    expect(updatedInvitation.createdAt).toEqual(invitation.createdAt)
    expect(updatedInvitation.modifiedAt).toEqual(updatedFields.modifiedAt)
    expect(updatedInvitation.email).toEqual(invitation.email)
    expect(updatedInvitation.invitationId).toEqual(updatedFields.invitationId)
    expect(updatedInvitation.invitedByUserId).toEqual(invitation.invitedByUserId)
    expect(updatedInvitation.expiresAt).toEqual(updatedFields.expiresAt)
    expect(updatedInvitationFromDb).toEqual(updatedInvitation)
    expect(invitations).toEqual(updatedInitialInvitations)
  })
})
