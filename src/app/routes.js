import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LandingPage } from "./components";
import Map from "./components/GoogleAPIWrapper";
import { DemoScrapbook } from "./features";

export default class routes extends Component {
  render() {
    return (
      <Router>
        <Route exactpath="/">
          <LandingPage />
        </Route>
        <Route path="/map">
          <Map />
        </Route>
        <Route path="/demo">
          <DemoScrapbook />
        </Route>
      </Router>
    );
  }
}
