import { Campaign } from '../graphql/types'

interface ICampaignService {
  findAll(): Promise<Campaign[]>
}

export default ICampaignService
