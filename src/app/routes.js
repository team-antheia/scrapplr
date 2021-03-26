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
    // const isLoggedIn = !!auth.currentUser;
    // console.log('user in routes', auth.currentUser);

    return (
      <Box justify='center' align='center' height='100vh'>
        <Route exact path='/home' component={() => <UserHome />} />

        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/demo'>
            <DemoScrapbook />
          </Route>
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/bookshelf'>
            <BookShelfView />
          </Route>
          <Route path='/test' component={LocationSearchInput} />
          <Route path='/streetview' component={StreetView} />
        </Switch>
      </Box>
    );
  }
}
