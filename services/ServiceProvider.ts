import CampaignService from './CampaignService'

interface ServiceProvider {
  init(): Promise<void>
  getCampaignService(): CampaignService
}

export default ServiceProvider
