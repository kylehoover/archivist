import { useStores } from '../../root'

export const useCampaignStore = () => {
  const { campaignStore } = useStores()
  return campaignStore
}
