import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar'
import Home from './views/Home'

import './styles/base.scss'
import './styles/color-classes.scss'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Switch>
          <Route exact strict path='/home/' component={Home} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App
