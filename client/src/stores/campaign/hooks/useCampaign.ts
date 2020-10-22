import { Campaign } from '../../../models'
import { useCampaignStore } from './useCampaignStore'

export const useCampaign = (id: string): Campaign | undefined => {
  const { campaigns } = useCampaignStore()
  return campaigns[id]
}
