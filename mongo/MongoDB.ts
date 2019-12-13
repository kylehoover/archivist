import { Collection as MongoCollection, Db, MongoClient } from 'mongodb'
import { Service } from 'typedi'

enum Collection {
  campaigns = 'campaigns',
}

enum EnvVar {
  dbName = 'AR_MONGO_DB',
  dbUrl = 'AR_MONGO_URL',
}

@Service()
class MongoDB {
  private conn?: Db

  private get db(): Db {
    if (!this.conn) {
      throw new Error('MongoDB is not connected')
    }

    return this.conn
  }

  public get campaigns(): MongoCollection {
    return this.db.collection(Collection.campaigns)
  }

  public async init(): Promise<void> {
    const dbName = process.env[EnvVar.dbName]
    const url = process.env[EnvVar.dbUrl]
    let client: MongoClient

    if (!dbName) {
      throw new Error(`${EnvVar.dbName} environment variable is not set`)
    }

    if (!url) {
      throw new Error(`${EnvVar.dbUrl} environment variable is not set`)
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
