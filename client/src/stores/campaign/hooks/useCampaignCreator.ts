import { AddCampaignInputType, addCampaign } from '../../../graphql'
import { useAsync } from '../../../helpers'
import { useCampaignStore } from './useCampaignStore'

export const useCampaignCreator = () => {
  const store = useCampaignStore()
  const [createCampaign, result] = useAsync(addCampaign)

  const createCampaignWrapper = async (input: AddCampaignInputType) => {
    const innerResult = await createCampaign(input)
    const { data, isSuccess } = innerResult

    if (isSuccess && data !== null) {
      store.addCampaign(data)
    }

    return innerResult
  }

  return [createCampaignWrapper, result] as const
}
