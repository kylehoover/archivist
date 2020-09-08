import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useAsync } from '.'
import { useStores } from '../stores'

const useOnAppLoad = () => {
  const history = useHistory()
  const { userStore } = useStores()
  const [loadCurrentUser, { isIdle, isPending }] = useAsync(userStore.loadCurrentUser)

  useEffect(() => {
    const run = async () => {
      const { isError, isSuccess } = await loadCurrentUser()
      const { pathname } = window.location

      if (isSuccess && pathname === '/') {
        history.replace('/home/')
      } else if (isError) {
        history.replace('/')
      }
    }

    run()
  }, [history, loadCurrentUser])

  return {
    isLoading: isIdle || isPending
  }
}

export default useOnAppLoad
