import { Service } from 'typedi'

import MongoDb from './MongoDb'
import UserRegistrationRequest, {
  NewUserRegistrationRequestModelFields,
  UpdatedUserRegistrationRequestModelFields,
} from '../models/UserRegistrationRequest'
import { UserRegistrationRequestService } from '../services'

@Service()
class MongoUserRegistrationRequestService implements UserRegistrationRequestService {
  constructor(private readonly db: MongoDb) {}

  public deleteById(id: string): Promise<UserRegistrationRequest> {
    return MongoDb.deleteById(id, this.db.userRegistrationRequests, UserRegistrationRequest.fromMongo)
  }

  public findAll(): Promise<UserRegistrationRequest[]> {
    return MongoDb.findAll(this.db.userRegistrationRequests, UserRegistrationRequest.fromMongo)
  }

  public findById(id: string): Promise<UserRegistrationRequest | null> {
    return MongoDb.findById(id, this.db.userRegistrationRequests, UserRegistrationRequest.fromMongo)
  }

  public insertOne(fields: NewUserRegistrationRequestModelFields): Promise<UserRegistrationRequest> {
    return MongoDb.insertOne(fields, this.db.userRegistrationRequests, UserRegistrationRequest.fromMongo)
  }

  public async updateById(id: string, fields: UpdatedUserRegistrationRequestModelFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<UserRegistrationRequest> {
    return MongoDb.updateById(
      id, fields, this.db.userRegistrationRequests, UserRegistrationRequest.fromMongo, options
    )
  }
}

export default MongoUserRegistrationRequestService
