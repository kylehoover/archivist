import { Service } from 'typedi'

import MongoDb from './MongoDb'
import UserRegistrationInvitation, {
  NewUserRegistrationInvitationModelFields,
} from '../models/UserRegistrationInvitation'
import { UserRegistrationInvitationService } from '../services'

@Service()
class MongoUserRegistrationInvitationService implements UserRegistrationInvitationService {
  constructor(private readonly db: MongoDb) {}

  public findAll(): Promise<UserRegistrationInvitation[]> {
    return MongoDb.findAll(this.db.users, UserRegistrationInvitation.fromMongo)
  }

  public findById(id: string): Promise<UserRegistrationInvitation | null> {
    return MongoDb.findById(id, this.db.users, UserRegistrationInvitation.fromMongo)
  }

  public insertOne(fields: NewUserRegistrationInvitationModelFields): Promise<UserRegistrationInvitation> {
    return MongoDb.insertOne(fields, this.db.users, UserRegistrationInvitation.fromMongo)
  }
}

export default MongoUserRegistrationInvitationService
