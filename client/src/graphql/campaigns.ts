import { AddCampaignData, AddCampaignInputType, CampaignType, GetCampaignsData } from './types'
import { authenticatedRequest } from './request'

export const fetchCampaigns = async (): Promise<CampaignType[]> => {
  const query = `
    query GetCampaigns {
      campaigns {
        id
        name
        modifiedAt
      }
    }
  `

  const data: GetCampaignsData = await authenticatedRequest(query)
  return data.campaigns
}

export const addCampaign = async (input: AddCampaignInputType): Promise<CampaignType> => {
  const mutation = `
    mutation AddCampaign($input: AddCampaignInputType!) {
      addCampaign(input: $input) {
        id
        name
        modifiedAt
      }
    }
  `

  const data: AddCampaignData = await authenticatedRequest(mutation, { input })
  return data.addCampaign
}
