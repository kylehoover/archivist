import { CampaignType, GetCampaignsData } from './types'
import { authenticatedRequest } from './request'

export const fetchCampaigns = async (): Promise<CampaignType[]> => {
  const query = `
    query GetCampaigns {
      campaigns {
        id
        name
      }
    }
  `

  const data: GetCampaignsData = await authenticatedRequest(query)
  return data.campaigns
}
