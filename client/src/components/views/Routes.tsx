import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Authorized } from '../common'
import { Campaign, Home, LandingPage, LogoutView, NewCampaign, NotFound } from './'

const Routes = () => {
  return (
    <Switch>
      <Route exact strict path='/'>
        <LandingPage />
      </Route>
      <Route exact strict path='/campaign/'>
        <Campaign />
      </Route>
      <Route exact strict path='/campaign/new/'>
        <NewCampaign />
      </Route>
      <Route exact strict path='/home/'>
        <Authorized>
          <Home />
        </Authorized>
      </Route>
      <Route exact strict path='/logout/'>
        <Authorized>
          <LogoutView />
        </Authorized>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes
