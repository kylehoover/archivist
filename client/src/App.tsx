import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Authorized, Loading } from './components'
import { Home, LandingPage } from './views'
import { useOnAppLoad } from './hooks'

import './styles/base.scss'

const App = () => {
  const { isLoading } = useOnAppLoad()

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='App'>
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
