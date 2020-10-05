import React from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'

import { Button, Icon } from '../'
import { useUserStore } from '../../../stores'
import './NavBarFlat.scss'

const NavBarFlat = observer(() => {
  const history = useHistory()
  const userStore = useUserStore()

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
})

export default NavBarFlat
