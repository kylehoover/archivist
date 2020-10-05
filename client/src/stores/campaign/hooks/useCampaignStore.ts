import { useStores } from '../../hooks'

export const useCampaignStore = () => {
  const { campaignStore } = useStores()
  return campaignStore
}
