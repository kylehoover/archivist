import { Collection, Db, MongoClient } from 'mongodb'
import { Service } from 'typedi'

type ProcessEnv = string | undefined

@Service()
class MongoDB {
  private conn?: Db

  private get db(): Db {
    if (!this.conn) {
      throw new Error('MongoDB is not connected')
    }

    return this.conn
  }

  public get campaigns(): Collection {
    return this.db.collection('campaigns')
  }

  public async init(): Promise<void> {
    const dbName: ProcessEnv = process.env.AR_MONGO_DB
    const url: ProcessEnv = process.env.AR_MONGO_URL
    let client: MongoClient

    if (!dbName) {
      throw new Error('AR_MONGO_DB environment variable is not set')
    }

    if (!url) {
      throw new Error('AR_MONGO_URL environment variable is not set')
    }

    try {
      client = await MongoClient.connect(url, { useUnifiedTopology: true })
    } catch (err) {
      console.error('Failed to connect to MongoDB')
      throw err
    }

    this.conn = client.db(dbName)
  }
}

export default MongoDB
