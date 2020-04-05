import AppSettingService from './AppSettingService'
import CampaignService from './CampaignService'
import UserRegistrationRequestService from './UserRegistrationRequestService'
import UserRoleService from './UserRoleService'
import UserService from './UserService'

interface ServiceProvider {
  init(): Promise<void>
  getAppSettingService(): AppSettingService
  getCampaignService(): CampaignService
  getUserRegistrationRequestService(): UserRegistrationRequestService
  getUserRoleService(): UserRoleService
  getUserService(): UserService
}

export default ServiceProvider
