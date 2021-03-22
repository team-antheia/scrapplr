import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { LandingPage } from './components';
import { Login } from './components/Login';
import { SignUp } from './components/Signup';
import history from './history';

export default class routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Route exact path="/" component={LandingPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}
