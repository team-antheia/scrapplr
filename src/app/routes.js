import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { LandingPage } from './components';
import { Login } from './components/Login';
import { SignUp } from './components/Signup';
import Map from './components/GoogleAPIWrapper';
import { DemoScrapbook } from './features';

export default class routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/demo">
          <DemoScrapbook />
          <Map />
        </Route>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}
