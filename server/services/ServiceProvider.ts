import { AppSettingService } from './AppSettingService'
import { CampaignService } from './CampaignService'
import { UserRegistrationInvitationService } from './UserRegistrationInvitationService'
import { UserRegistrationRequestService } from './UserRegistrationRequestService'
import UserRoleService from './UserRoleService'
import { UserService } from './UserService'

export interface ServiceProvider {
  init(): Promise<void>
  getAppSettingService(): AppSettingService
  getCampaignService(): CampaignService
  getUserRegistrationInvitationService(): UserRegistrationInvitationService
  getUserRegistrationRequestService(): UserRegistrationRequestService
  getUserRoleService(): UserRoleService
  getUserService(): UserService
}
