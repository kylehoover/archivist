import MongoDb from '../MongoDb'

const db = new MongoDb()

beforeAll(async () => {
  await db.initForTesting()
})

afterAll(async () => {
  await db.close()
})

describe('Mongodb', () => {
  it('should find a document', async () => {
    const users = await db.users.find().toArray()
    expect(users).toEqual([])
  })
})
