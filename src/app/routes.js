import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import { LandingPage } from "./components";
import { Login } from "./components/Login";
import { SignUp } from "./components/Signup";
import { ScrapbookView, BookShelfView, UserHome } from "./features";
import { Box } from "grommet";
import firebase, { auth, firestore } from "../index";
import SinglePage from "./features/SinglePage";

import LocationSearchInput from "./components/LocationSearchInput";
import StreetView from "./components/StreetView";
import MapContainer from "./components/MapContainer";

export default class routes extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      email: "",
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
          });
        }
      } else {
        // No user is signed in.
        console.log("Not logged in");
      }
    });
  }

  render() {
    // const isLoggedIn = !!auth.currentUser;
    console.log('state in route', this.state)
    return (
      <Box justify="center" align="center" height="100vh">
        {auth.currentUser !== null && auth.currentUser.email && (
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
        )}

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
            <ScrapbookView user={"demo"} />
          </Route>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/bookshelf">
            <BookShelfView />
          </Route>

          <Route path="/test" component={LocationSearchInput} />
          <Route path="/streetview" component={StreetView} />
          <Route path="/page" component={SinglePage} />
          {/* <Route path="/map" component={MapContainer} /> */}
        </Switch>
      </Box>
    );
  }
}
