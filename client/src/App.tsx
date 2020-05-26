import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Authorized } from './components'
import { Home, LandingPage } from './views'
import Test from './views/Test'

import './styles/base.scss'

const App = () => {
  return (
    <BrowserRouter>
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
          <Route exact strict path='/test/'>
            <Test />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
