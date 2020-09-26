import React from 'react'

import { Loading, NavBarFlat, Routes } from './components'
import { useOnAppLoad } from './hooks'

import './styles/index.scss'

const App = () => {
  const { isLoading } = useOnAppLoad()

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='App'>
      <NavBarFlat />
      <main>
        <Routes />
      </main>
    </div>
  )
}

export default App
