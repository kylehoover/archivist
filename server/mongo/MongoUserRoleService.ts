import { Service } from 'typedi'

import MongoDb from './MongoDb'
import UserRole, { NewUserRoleModelFields } from '../models/UserRole'
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
}

export default MongoUserRoleService
