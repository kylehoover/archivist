import { useEffect } from 'react'

import { fetchCampaigns } from '../../../graphql'
import { useAsync } from '../../../helpers'
import { useCampaignStore } from './useCampaignStore'

export const useCampaignsLoader = () => {
  const store = useCampaignStore()
  const { addCampaigns, handleDidLoadData, needsToLoadData } = store
  const [loadCampaigns] = useAsync(fetchCampaigns)

  useEffect(() => {
    const run = async () => {
      const { data, isSuccess } = await loadCampaigns()

      if (isSuccess && data !== null) {
        addCampaigns(data)
        handleDidLoadData()
      }
    }

    if (needsToLoadData) {
      run()
    }
  }, [addCampaigns, handleDidLoadData, loadCampaigns, needsToLoadData])
}
