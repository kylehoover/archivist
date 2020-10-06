import { useCallback } from 'react'

export const useDelay = () => {
  const delay = useCallback((delayTimeMillis: number): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(resolve, delayTimeMillis)
    })
  }, [])

  return delay
}
