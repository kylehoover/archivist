import { Service } from 'typedi'

import MongoDb from './MongoDb'
import UserRole, { NewUserRoleModelFields, UpdatedUserRoleModelFields } from '../models/UserRole'
import { UserRoleService } from '../services'

@Service()
class MongoUserRoleService implements UserRoleService {
  constructor(private readonly db: MongoDb) {}

  public deleteById(id: string): Promise<UserRole> {
    return MongoDb.deleteById(id, this.db.userRoles, UserRole.fromMongo)
  }

  public findAll(): Promise<UserRole[]> {
    return MongoDb.findAll(this.db.userRoles, UserRole.fromMongo)
  }

  public findById(id: string): Promise<UserRole | null> {
    return MongoDb.findById(id, this.db.userRoles, UserRole.fromMongo)
  }

  public async findDefaultRole(): Promise<UserRole> {
    const userRoles = await this.db.userRoles.find({ isDefault: true }).toArray()
    return UserRole.getDefaultRoleFromList(userRoles)
  }

  public insertOne(fields: NewUserRoleModelFields): Promise<UserRole> {
    return MongoDb.insertOne(fields, this.db.userRoles, UserRole.fromMongo)
  }

  public async updateById(id: string, fields: UpdatedUserRoleModelFields, options = {
    returnOriginal: false,
    upsert: false,
  }): Promise<UserRole> {
    return MongoDb.updateById(id, fields, this.db.userRoles, UserRole.fromMongo, options)
  }
}

export default MongoUserRoleService
