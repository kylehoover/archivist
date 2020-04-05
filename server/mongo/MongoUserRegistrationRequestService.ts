import { Service } from 'typedi'

import MongoDb from './MongoDb'
import UserRegistrationRequest, { NewUserRegistrationRequestModelFields } from '../models/UserRegistrationRequest'
import { UserRegistrationRequestService } from '../services'

@Service()
class MongoUserRegistrationRequestService implements UserRegistrationRequestService {
  constructor(private readonly db: MongoDb) {}

  public findAll(): Promise<UserRegistrationRequest[]> {
    return MongoDb.findAll(this.db.users, UserRegistrationRequest.fromMongo)
  }

  public findById(id: string): Promise<UserRegistrationRequest | null> {
    return MongoDb.findById(id, this.db.users, UserRegistrationRequest.fromMongo)
  }

  public insertOne(fields: NewUserRegistrationRequestModelFields): Promise<UserRegistrationRequest> {
    return MongoDb.insertOne(fields, this.db.users, UserRegistrationRequest.fromMongo)
  }
}

export default MongoUserRegistrationRequestService
