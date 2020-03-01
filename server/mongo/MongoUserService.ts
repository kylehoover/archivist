import { ObjectId } from 'mongodb'
import { Service } from 'typedi'

import { User } from '../models'
import { UserService } from '../services'
import MongoDB from './MongoDB'

@Service()
class MongoUserService implements UserService {
  constructor(private readonly db: MongoDB) {}

  public async findAll(): Promise<User[]> {
    return []
  }

  public async findById(id: string): Promise<User | null> {
    return null
  }
}

export default MongoUserService
