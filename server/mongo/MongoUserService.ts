import { ObjectId } from 'mongodb'
import { Service } from 'typedi'

import { User } from '../models'
import { UserService } from '../services'
import MongoDB from './MongoDB'

@Service()
class MongoUserService implements UserService {
  constructor(private readonly db: MongoDB) {}

  public findAll(): Promise<User[]> {
    return MongoDB.findAll(this.db.users, User.fromMongoDocument)
  }

  public async findById(id: string): Promise<User | null> {
    const doc = await this.db.users.findOne({ _id: new ObjectId(id) })
    return doc ? User.fromMongoDocument(doc) : null
  }
}

export default MongoUserService
