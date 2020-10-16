import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { logoutUser } from '../../../graphql'
import { useAsync } from '../../../helpers'
import { useRootStore } from '../../root'

export const useLogoutHandler = () => {
  const history = useHistory()
  const [didRunEffect, setDidRunEffect] = useState(false)
  const [logout] = useAsync(logoutUser, { minDelayMillis: 500 })
  const { clearStores } = useRootStore()

  useEffect(() => {
    const run = async () => {
      const { isSuccess } = await logout()

      if (isSuccess) {
        clearStores()
        history.push('/')
      }
    }

    if (!didRunEffect) {
      run()
      setDidRunEffect(true)
    }
  }, [ clearStores, didRunEffect, history, logout ])
}
