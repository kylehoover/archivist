import { MongoError, ObjectId } from 'mongodb'
import { Service } from 'typedi'

import MongoDb from './MongoDb'
import UserRole, { NewUserRoleModelFields, UpdatedUserRoleModelFields } from '../models/UserRole'
import { UserRoleService } from '../services'

@Service()
class MongoUserRoleService implements UserRoleService {
  constructor(private readonly db: MongoDb) {}

  public findAll(): Promise<UserRole[]> {
    return MongoDb.findAll(this.db.userRoles, UserRole.fromMongo)
  }

  public findById(id: string): Promise<UserRole | null> {
    return MongoDb.findById(id, this.db.userRoles, UserRole.fromMongo)
  }

  public findDefaultRole(): Promise<UserRole | null> {
    return this.db.userRoles.findOne({ isDefault: true })
  }

  public insertOne(fields: NewUserRoleModelFields): Promise<UserRole> {
    return MongoDb.insertOne(fields, this.db.userRoles, UserRole.fromMongo)
  }

  public async updateById(
    id: string,
    fields: UpdatedUserRoleModelFields,
    options?: {
      returnOriginal: false
      upsert: false
    },
  ): Promise<UserRole> {
    const result = await this.db.userRoles.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: fields },
      options
    )

    if (result.lastErrorObject.updatedExisting) {
      return UserRole.fromMongo(result.value)
    }

    throw new MongoError('MongoDB Error: Failed to update UserRole document')
  }
}

export default MongoUserRoleService
