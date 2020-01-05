import React from 'react'
import { Link } from 'react-router-dom'

import './NavBar.scss'

const NavBar = () => {
  return (
    <nav className='NavBar'>
      <header>
        <Link to='/'>
          Archivist
        </Link>
      </header>
    </nav>
  )
}

export default NavBar
