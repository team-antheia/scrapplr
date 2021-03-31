import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import { LandingPage } from "./components";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/Signup";
import { ScrapbookView, BookShelfView, UserHome } from "./components";
import { Box, Heading } from "grommet";
import firebase, { auth, firestore } from "../index";
import SinglePage from "./components/scrapbook/SinglePage";
import LocationSearchInput from "./components/map/360/LocationSearchInput";
import StreetView from "./components/map/360/StreetView";
import MapContainer from "./components/map/markerMap/MapContainer";
import Default from "./components/scrapbook/layouts/Default";
import CaptionTop from "./components/scrapbook/layouts/CaptionTop";
import CaptionBottom from "./components/scrapbook/layouts/CaptionBottom";
import CaptionMiddle from "./components/scrapbook/layouts/CaptionMiddle";

export default class routes extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      email: "",
      name: "",

    };
  }
  async componentDidMount() {
    firebase.auth().onAuthStateChanged(async (auth) => {
      if (auth) {
        const email = auth.email;
        // User is signed in. Uses email to find uid from db
        const usersRef = firestore.collection("Users");
        const user = await usersRef.where("email", "in", [email]).get();
        if (!user) {
          console.log("No user found");
        } else {
          console.log("User found");
          this.setState({
            userId: user.docs[0].id,
            email: email,
            name: auth.displayName,
          });
        }
      } else {
        // No user is signed in.
        console.log("Not logged in");
      }
    });
  }

  render() {
    return (
      <Box justify="center" align="center" height="100vh">
        {/* {auth.currentUser !== null && auth.currentUser.email && (
          <Route
            exact
            path="/home"
            component={() => (
              <UserHome
                userId={auth.currentUser ? this.state.userId : false}
                email={this.state.email}
              />
            )}
          />
        )} */}

        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route
            path="/scrapbooks/:scrapbookId"
            render={(props) => (
              <ScrapbookView
                userId={this.state.userId}
                params={props.match.params}
              />
            )}
          ></Route>
          <Route path="/demo">

            <ScrapbookView user={'demo'} />
          </Route>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/bookshelf">
            <BookShelfView />
          </Route>
          <Route path="/test" component={LocationSearchInput} />
          <Route path="/streetview" component={StreetView} />
          {/* <Route path="/map" component={MapContainer} /> */}
          {auth.currentUser !== null && auth.currentUser.email && (
            <Route
              exact
              path="/home"
              component={() => (
                <UserHome
                  userId={auth.currentUser ? this.state.userId : false}
                  email={this.state.email}
                  name={this.state.name}
                />
              )}
            />
          )}

          <Route path="/grids">
            <Box width="100%" pad="medium">
              <Heading margin="small" level="4">
                Default grid 👇🏽
              </Heading>
              <Default />
              <Heading margin="medium" level="4">
                Caption Top 👇🏽
              </Heading>
              <CaptionTop />
              <Heading margin="medium" level="4">
                Caption Middle 👇🏽
              </Heading>
              <CaptionMiddle />
              <Heading margin="medium" level="4">
                Caption Bottom 👇🏽
              </Heading>
              <CaptionBottom />
            </Box>
          </Route>

          <Route path="/" component={LandingPage} />
        </Switch>
      </Box>
    );
  }
}
