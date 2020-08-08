import React from 'react'
import { useHistory } from 'react-router-dom'

import { Button, Icon } from '../'
import { useStores } from '../../stores'
import './NavBarFlat.scss'

const NavBarFlat = () => {
  const history = useHistory()
  const { userStore } = useStores()

  async function handleLogout() {
    await userStore.logoutUser()
    history.push('/')
  }

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
}

export default NavBarFlat
