import React, { Component } from 'react';


import { Route, Switch } from "react-router-dom";
import { LandingPage } from "./components";
import { Login } from "./components/Login";
import { SignUp } from "./components/Signup";
import { DemoScrapbook, BookShelfView, UserHome } from "./features";
import { Box } from "grommet";
import { auth } from "../index";
import LocationSearchInput from './components/LocationSearchInput'
import StreetView from './components/StreetView';
import MapContainer from './components/MapContainer';

export default class routes extends Component {
  render() {
    const isLoggedIn = !!auth.currentUser;
    console.log("user in routes", auth.currentUser);

    return (

      <Box justify="center" align="center" height="100vh">
        <Route
          exact
          path="/home"
          component={() => (
            <UserHome user={auth.currentUser ? auth.currentUser : false} />
          )}
        />

        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/demo">
            <DemoScrapbook />
          </Route>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/bookshelf">
            <BookShelfView />
          </Route>
        <Route exact path="/test" component={LocationSearchInput} />
        <Route exact path='/streetview' component={StreetView} />
        </Switch>
      </Box>
    );
  }
}

