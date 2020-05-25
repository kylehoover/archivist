import { useContext } from 'react'

import { StoreContext } from './StoreProvider'

export const useStores = () => {
  const rootStore = useContext(StoreContext)

  if (rootStore === null) {
    throw new Error('useStores can only be used within a StoreProvider')
  }

  return {
    campaignStore: rootStore.campaignStore,
    rootStore,
    userStore: rootStore.userStore,
  }
}