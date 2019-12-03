import ICampaignService from './ICampaignService'

interface IServiceProvider {
  getCampaignService(): ICampaignService
}

export default IServiceProvider
