import { Service } from 'typedi'

import UserRegistrationInvitation, {
  NewUserRegistrationInvitationModelFields,
  UpdatedUserRegistrationInvitationModelFields,
} from '../models/UserRegistrationInvitation'
import { MongoDb } from './MongoDb'
import { UserRegistrationInvitationService } from '../services'

@Service()
class MongoUserRegistrationInvitationService implements UserRegistrationInvitationService {
  constructor(private readonly db: MongoDb) {}

  public deleteById(id: string): Promise<UserRegistrationInvitation> {
    return MongoDb.deleteById(id, this.db.userRegistrationInvitations, UserRegistrationInvitation.fromMongo)
  }

  public findAll(): Promise<UserRegistrationInvitation[]> {
    return MongoDb.findAll(this.db.userRegistrationInvitations, UserRegistrationInvitation.fromMongo)
  }

  public findById(id: string): Promise<UserRegistrationInvitation | null> {
    return MongoDb.findById(id, this.db.userRegistrationInvitations, UserRegistrationInvitation.fromMongo)
  }

  public insertOne(fields: NewUserRegistrationInvitationModelFields): Promise<UserRegistrationInvitation> {
    return MongoDb.insertOne(
      fields, this.db.userRegistrationInvitations, UserRegistrationInvitation.fromMongo
    )
  }

  public async updateById(id: string, fields: UpdatedUserRegistrationInvitationModelFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<UserRegistrationInvitation> {
    return MongoDb.updateById(
      id, fields, this.db.userRegistrationInvitations, UserRegistrationInvitation.fromMongo, options
    )
  }
}

export default MongoUserRegistrationInvitationService
