import { Campaign } from '../graphql/types'

interface ICampaignService {
  findAll(): Promise<Campaign[]>
  findById(id: string): Promise<Campaign | null>
}

export default ICampaignService
