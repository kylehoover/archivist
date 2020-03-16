import { Service } from 'typedi'

import MongoDb from './MongoDb'
import User, { NewUserModelFields } from '../models/User'
import { UserService } from '../services'

@Service()
class MongoUserService implements UserService {
  constructor(private readonly db: MongoDb) {}

  public findAll(): Promise<User[]> {
    return MongoDb.findAll(this.db.users, User.fromMongo)
  }

  public findById(id: string): Promise<User | null> {
    return MongoDb.findById(id, this.db.users, User.fromMongo)
  }

  public insertOne(fields: NewUserModelFields): Promise<User> {
    return MongoDb.insertOne(fields, this.db.users, User.fromMongo)
  }
}

export default MongoUserService
