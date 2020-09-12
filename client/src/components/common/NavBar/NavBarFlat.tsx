import React from 'react'
import { useHistory } from 'react-router-dom'
import { useObserver } from 'mobx-react-lite'

import { Button, Icon } from '../'
import { useUserStore } from '../../../stores'
import './NavBarFlat.scss'

const NavBarFlat = () => {
  const history = useHistory()
  const userStore = useUserStore()

  async function handleLogout() {
    await userStore.logoutUser()
    history.push('/')
  }

  return useObserver(() => {
    if (userStore.currentUser === undefined) {
      return null
    }

    return (
      <nav className='NavBarFlat'>
        <div>
          <Icon name='logo' size={2} />
        </div>
        <Button onClick={handleLogout}>
          Log Out
        </Button>
      </nav>
    )
  })
}

export default NavBarFlat
