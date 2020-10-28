import { AppSettingService } from './AppSettingService'
import { CampaignService } from './CampaignService'
import { RaceService } from './RaceService'
import { UserRegistrationInvitationService } from './UserRegistrationInvitationService'
import { UserRegistrationRequestService } from './UserRegistrationRequestService'
import { UserRoleService } from './UserRoleService'
import { UserService } from './UserService'

export interface ServiceProvider {
  init(): Promise<void>
  getAppSettingService(): AppSettingService
  getCampaignService(): CampaignService
  getRaceService(): RaceService
  getUserRegistrationInvitationService(): UserRegistrationInvitationService
  getUserRegistrationRequestService(): UserRegistrationRequestService
  getUserRoleService(): UserRoleService
  getUserService(): UserService
}
