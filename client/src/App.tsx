import React from 'react'
import { LoadingIndicator, NavBarFlat, Routes } from './components'
import { useOnAppLoad } from './helpers'

export const App = () => {
  const { isLoading } = useOnAppLoad()

  if (isLoading) {
    return <LoadingIndicator className='row center middle full-height' size={30} />
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
