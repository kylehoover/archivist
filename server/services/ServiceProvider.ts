import AppSettingService from './AppSettingService'
import CampaignService from './CampaignService'
import UserRoleService from './UserRoleService'
import UserService from './UserService'

interface ServiceProvider {
  init(): Promise<void>
  getAppSettingService(): AppSettingService
  getCampaignService(): CampaignService
  getUserRoleService(): UserRoleService
  getUserService(): UserService
}

export default ServiceProvider
