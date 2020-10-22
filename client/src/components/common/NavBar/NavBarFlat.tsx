import React from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory, useLocation } from 'react-router-dom'
import { Button, Icon } from '../'
import { useUserStore } from '../../../stores'
import './NavBarFlat.scss'

export const NavBarFlat = observer(() => {
  const history = useHistory()
  const { pathname } = useLocation()
  const { currentUser } = useUserStore()
  const disabled = pathname === '/logout/'

  async function handleLogout() {
    history.push('/logout/')
  }

  if (currentUser === undefined) {
    return null
  }

  return (
    <nav className='NavBarFlat'>
      <div>
        <Icon name='logo' size={2} />
      </div>
      <Button onClick={handleLogout} disabled={disabled}>
        Log Out
      </Button>
    </nav>
  )
})
