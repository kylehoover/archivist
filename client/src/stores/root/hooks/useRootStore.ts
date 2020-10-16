import { useStores } from './useStores'

export const useRootStore = () => {
  const { rootStore } = useStores()
  return rootStore
}
