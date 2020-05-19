import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home, LandingPage } from './views/'
import NavBar from './components/NavBar'
import Test from './views/Test'

import './styles/base.scss'

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact strict path='/' component={LandingPage} />
          <Route exact strict path='/home/' component={Home} />
          <Route exact strict path='/test/' component={Test} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
