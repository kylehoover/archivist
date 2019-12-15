import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import NavBar from './components/NavBar'
import './styles/base.scss'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  )
}

export default App
