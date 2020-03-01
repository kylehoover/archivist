import { Collection, Db, MongoClient } from 'mongodb'
import { Service } from 'typedi'

enum ArchivistCollection {
  Campaigns = 'campaigns',
  Users = 'users',
}

enum EnvVar {
  DbName = 'AR_MONGO_DB',
  DbUrl = 'AR_MONGO_URL',
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

  public get campaigns(): Collection {
    return this.db.collection(ArchivistCollection.Campaigns)
  }

  public get users(): Collection {
    return this.db.collection(ArchivistCollection.Users)
  }

  public static findAll<T>(collection: Collection, transform: (doc: any) => T): Promise<T[]> {
    return collection.find().map(transform).toArray()
  }

  public async init(): Promise<void> {
    const dbName = process.env[EnvVar.DbName]
    const url = process.env[EnvVar.DbUrl]
    let client: MongoClient

    if (!dbName) {
      throw new Error(`${EnvVar.DbName} environment variable is not set`)
    }

    if (!url) {
      throw new Error(`${EnvVar.DbUrl} environment variable is not set`)
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
