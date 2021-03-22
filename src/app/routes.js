import React, { Component } from "react";
import { LandingPage } from "./components";
import Map from "./components/GoogleAPIWrapper";
import { Route } from "react-router-dom";
import { DemoScrapbook } from "./features";

export default class routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/map">
          <Map />
        </Route>
        <Route exact path="/demo">
          <DemoScrapbook />
        </Route>
      </div>
    );
  }
}
