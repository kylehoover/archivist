import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '../'
import { useStores } from '../../../stores'
import './NavBar.scss'

export const NavBar = () => {
  const history = useHistory()
  const { userStore } = useStores()

  async function handleLogout() {
    history.push('/')
  }

  if (userStore.currentUser === undefined) {
    return null
  }

  return (
    <nav className='NavBar'>
      <header>
        <Link to='/'>
          Archivist
        </Link>
      </header>
      <Button onClick={handleLogout}>
        Log Out
      </Button>
    </nav>
  )
}
