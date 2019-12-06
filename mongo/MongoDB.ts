import { Db, MongoClient } from 'mongodb'

type ProcessEnv = string | undefined

class MongoDB {
  private mongodb?: Db

  public get db(): Db | undefined {
    return this.mongodb
  }

  public async init(): Promise<void> {
    const dbName: ProcessEnv = process.env.AR_MONGO_DB
    const url: ProcessEnv = process.env.AR_MONGO_URL
    let client

    if (!dbName) {
      throw new Error('process.env.AR_MONGO_DB is not set')
    }

    if (!url) {
      throw new Error('process.env.AR_MONGO_DB is not set')
    }

    try {
      client = await MongoClient.connect(url, { useUnifiedTopology: true })
    } catch (err) {
      console.error('ERROR: Failed to connect to MongoDB')
      console.error(err.message)
      throw err
    }

    this.mongodb = client.db(dbName)
  }
}

export default MongoDB
