import { useStores } from '../../root'

export const useCurrentUser = () => {
  const { userStore } = useStores()
  
  if (userStore.currentUser === undefined) {
    throw new Error('useCurrentUser should only be used when a user is guaranteed to be logged in')
  }

  return userStore.currentUser
}
