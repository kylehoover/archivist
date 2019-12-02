import { Campaign } from '../types'

interface ICampaignService {
  findAll(): Campaign[]
}

export default ICampaignService
