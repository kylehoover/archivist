import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Authorized, Home, LandingPage, Loading, NavBarFlat } from './components'
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
        <Switch>
          <Route exact strict path='/'>
            <LandingPage />
          </Route>
          <Route exact strict path='/home/'>
            <Authorized>
              <Home />
            </Authorized>
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default App
