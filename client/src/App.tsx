import React from 'react'
import { Loading, NavBarFlat, Routes } from './components'
import { useOnAppLoad } from './helpers'

import './styles/index.scss'

export const App = () => {
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
