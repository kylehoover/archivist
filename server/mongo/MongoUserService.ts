import { Service } from 'typedi'

import MongoDb from './MongoDb'
import User, { NewUserModelFields, UpdatedUserModelFields } from '../models/User'
import { UserService } from '../services'

@Service()
class MongoUserService implements UserService {
  constructor(private readonly db: MongoDb) {}

  public deleteById(id: string): Promise<User> {
    return MongoDb.deleteById(id, this.db.users, User.fromMongo)
  }

  public findAll(): Promise<User[]> {
    return MongoDb.findAll(this.db.users, User.fromMongo)
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.users.findOne({ email })
    return user === null ? null : User.fromMongo(user)
  }

  public findById(id: string): Promise<User | null> {
    return MongoDb.findById(id, this.db.users, User.fromMongo)
  }

  public insertOne(fields: NewUserModelFields): Promise<User> {
    return MongoDb.insertOne(fields, this.db.users, User.fromMongo)
  }

  public async updateById(id: string, fields: UpdatedUserModelFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<User> {
    return MongoDb.updateById(id, fields, this.db.users, User.fromMongo, options)
  }
}

export default MongoUserService
