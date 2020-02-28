import CampaignService from './CampaignService'
import UserService from './UserService'

interface ServiceProvider {
  init(): Promise<void>
  getCampaignService(): CampaignService
  getUserService(): UserService
}

export default ServiceProvider
