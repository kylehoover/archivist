import { useContext } from 'react'

import { StoreContext } from './StoreProvider'

export const useCurrentUser = () => {
  const { userStore } = useStores()
  
  if (userStore.currentUser === undefined) {
    throw new Error('useCurrentUser should only be used when a user is guaranteed to be logged in')
  }

  return userStore.currentUser
}

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