import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Authorized, ErrorBoundary } from './components'
import { Home, LandingPage } from './views'
import Test from './views/Test'

import './styles/base.scss'

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
