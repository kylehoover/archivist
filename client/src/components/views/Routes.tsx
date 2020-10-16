import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Authorized } from '../common'
import {
  CampaignView,
  HomeView,
  LoginView,
  LogoutView,
  NewCampaignView,
  NotFoundView,
} from './'

export const Routes = () => {
  return (
    <Switch>
      <Route exact strict path='/'>
        <LoginView />
      </Route>
      <Route exact strict path='/campaign/'>
        <Authorized>
          <CampaignView />
        </Authorized>
      </Route>
      <Route exact strict path='/campaign/new/'>
        <Authorized>
          <NewCampaignView />
        </Authorized>
      </Route>
      <Route exact strict path='/home/'>
        <Authorized>
          <HomeView />
        </Authorized>
      </Route>
      <Route exact strict path='/logout/'>
        <Authorized>
          <LogoutView />
        </Authorized>
      </Route>
      <Route>
        <NotFoundView />
      </Route>
    </Switch>
  )
}
