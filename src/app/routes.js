import React, { Component } from 'react';

import { Router, Route } from 'react-router-dom';
import { LandingPage } from './components';
import { Login } from './components/Login';
import { SignUp } from './components/Signup';
import history from './history';
import Map from './components/GoogleAPIWrapper';


export default class routes extends Component {
  render() {
    return (

      <Router history={history}>
        <Route exact path="/">
      <LandingPage />
      <Map />
      </Route>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      

      </Router>
    );
  }
}
