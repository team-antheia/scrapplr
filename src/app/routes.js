import React, { Component } from "react";

import { Route } from "react-router-dom";
import { LandingPage } from "./components";
import { Login } from "./components/Login";
import { SignUp } from "./components/Signup";
import MapContainer from './components/MapContainer';
import { DemoScrapbook, BookShelfView } from "./features";
import { Box } from "grommet";

import LocationSearchInput from './components/GoogleSuggest'

export default class routes extends Component {
  render() {
    return (
      <Box justify="center" align="center" height="100vh">
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/demo">
          <DemoScrapbook />
          <MapContainer />
        </Route>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/bookshelf" component={BookShelfView} />
        <Route path="/test" component={LocationSearchInput} />
      </Box>
    );
  }
}

