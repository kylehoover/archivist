import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Authorized } from '../common'
import { Campaign, Home, LandingPage } from './'

const Routes = () => {
  return (
    <Switch>
      <Route exact strict path='/'>
        <LandingPage />
      </Route>
      <Route exact strict path='/campaign/'>
        <Campaign />
      </Route>
      <Route exact strict path='/home/'>
        <Authorized>
          <Home />
        </Authorized>
      </Route>
    </Switch>
  )
}

export default Routes
