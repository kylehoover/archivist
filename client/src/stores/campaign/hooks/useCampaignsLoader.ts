import { useEffect } from 'react'

import { Campaign } from '../../../models'
import { fetchCampaigns } from '../../../graphql'
import { useAsync } from '../../../hooks'
import { useCampaignStore } from './useCampaignStore'

export const useCampaignsLoader = () => {
  const store = useCampaignStore()
  const { addCampaigns, hasLoadedOnce, setHasLoadedOnce } = store
  const [loadCampaigns] = useAsync(fetchCampaigns)

  useEffect(() => {
    const run = async () => {
      const { data, isSuccess } = await loadCampaigns()

      if (isSuccess && data !== null) {
        addCampaigns(data.map(campaign => Campaign.fromGraphQLType(campaign)))
        setHasLoadedOnce(true)
      }
    }

    if (!hasLoadedOnce) {
      run()
    }
  }, [addCampaigns, hasLoadedOnce, loadCampaigns, setHasLoadedOnce])
}
