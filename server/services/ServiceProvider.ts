import AppSettingService from './AppSettingService'
import CampaignService from './CampaignService'
import UserService from './UserService'

interface ServiceProvider {
  init(): Promise<void>
  getAppSettingService(): AppSettingService
  getCampaignService(): CampaignService
  getUserService(): UserService
}

export default ServiceProvider
