import { Container, Service } from 'typedi'

import { MongoAppSettingService } from './MongoAppSettingService'
import { MongoCampaignService } from './MongoCampaignService'
import MongoUserRegistrationInvitationService from './MongoUserRegistrationInvitationService'
import MongoUserRegistrationRequestService from './MongoUserRegistrationRequestService'
import MongoUserRoleService from './MongoUserRoleService'
import { MongoUserService } from './MongoUserService'
import { MongoDb } from './MongoDb'
import { ServiceProvider } from '../services'

@Service()
class MongoServiceProvider implements ServiceProvider {
  constructor(private readonly db: MongoDb) {}

  public async init(): Promise<void> {
    await this.db.initFromEnv()
  }

  public getAppSettingService(): MongoAppSettingService {
    return Container.get(MongoAppSettingService)
  }

  public getCampaignService(): MongoCampaignService {
    return Container.get(MongoCampaignService)
  }

  public getUserRegistrationInvitationService(): MongoUserRegistrationInvitationService {
    return Container.get(MongoUserRegistrationInvitationService)
  }

  public getUserRegistrationRequestService(): MongoUserRegistrationRequestService {
    return Container.get(MongoUserRegistrationRequestService)
  }

  public getUserRoleService(): MongoUserRoleService {
    return Container.get(MongoUserRoleService)
  }

  public getUserService(): MongoUserService {
    return Container.get(MongoUserService)
  }
}

export default MongoServiceProvider
