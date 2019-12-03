import { Campaign } from '../graphql/types'

interface ICampaignService {
  findAll(): Campaign[]
}

export default ICampaignService
