import { authenticatedRequest } from './request'
import {
  AddCampaignData,
  AddCampaignInputType,
  CampaignType,
  GetCampaignData,
  GetCampaignsData,
} from './types'

// Queries //

export const fetchCampaign = async (id: string): Promise<CampaignType | null> => {
  const query = `
    query GetCampaign($id: ID!) {
      campaign(id: $id) {
        id
        name
        modifiedAt
      }
    }
  `

  const data: GetCampaignData = await authenticatedRequest(query, { id })
  return data.campaign
}

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

// Mutations //

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
