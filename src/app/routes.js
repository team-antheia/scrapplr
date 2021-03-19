import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { LandingPage } from './components';
import Map from './components/GoogleAPIWrapper';

export default class routes extends Component {
  render() {
    return (
      <Router>
        <Route path='/'>
          <Map />
        </Route>
      </Router>
    );
  }
}
