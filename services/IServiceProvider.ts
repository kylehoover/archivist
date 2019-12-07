import ICampaignService from './ICampaignService'

interface IServiceProvider {
  init(): Promise<void>
  getCampaignService(): ICampaignService
}

export default IServiceProvider
