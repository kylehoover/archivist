import { useEffect, useRef, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import { useStores } from '../stores'

const useOnAppLoad = () => {
  const [isLoading, setIsLoading] = useState(true)
  const hasRunOnce = useRef(false)
  const history = useHistory()
  const { pathname } = useLocation()
  const { userStore } = useStores()

  useEffect(() => {
    const loadCurrentUser = async () => {
      hasRunOnce.current = true

      try {
        await userStore.loadCurrentUser()
      } catch (error) {
        if (pathname !== '/') {
          history.replace('/')
        }

        setIsLoading(false)
        return
      }

      if (pathname === '/') {
        history.replace('/home/')
      }

      setIsLoading(false)
    }

    if (!hasRunOnce.current) {
      loadCurrentUser()
    }
  })

  return {
    isLoading,
  }
}

export default useOnAppLoad
