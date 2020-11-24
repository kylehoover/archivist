import { useEffect } from 'react'
import { fetchRaces } from '../../../graphql'
import { useAsync } from '../../../helpers'

export const useRacesLoader = () => {
  const [loadRaces] = useAsync(fetchRaces)

  useEffect(() => {
    loadRaces()
  }, [loadRaces])
}
