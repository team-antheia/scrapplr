
import React, { Component } from "react";
import { LandingPage } from "./components";
import Map from "./components/GoogleAPIWrapper";
import { Route } from "react-router-dom";


import React, { Component } from 'react';

import { Router, Route } from 'react-router-dom';
import { LandingPage } from './components';
import { Login } from './components/Login';
import { SignUp } from './components/Signup';
import history from './history';
import Map from './components/GoogleAPIWrapper';
import { DemoScrapbook } from "./features";



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
