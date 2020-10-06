import { useStores } from '../../root'

export const useUserStore = () => {
  const { userStore } = useStores()
  return userStore
}
