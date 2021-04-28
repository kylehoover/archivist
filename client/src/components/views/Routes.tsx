import React from "react";
import { Route, Switch } from "react-router-dom";
import { Authorized } from "../common";
import {
  CampaignView,
  HomeView,
  LoginView,
  LogoutView,
  NewCampaignView,
  NotFoundView,
} from "./";

export const Routes = () => {
  return (
    <Switch>
      <Route exact strict path="/">
        <LoginView />
      </Route>

      {/* Authorized routes */}
      <Authorized>
        <Route exact strict path="/campaign/new/">
          <NewCampaignView />
        </Route>
        <Route exact strict path="/campaign/:id/">
          <CampaignView />
        </Route>
        <Route exact strict path="/home/">
          <HomeView />
        </Route>
        <Route exact strict path="/logout/">
          <LogoutView />
        </Route>
      </Authorized>

      {/* Fall-through route */}
      <Route>
        <NotFoundView />
      </Route>
    </Switch>
  );
};
