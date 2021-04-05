import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  Login,
  SignUp,
  LandingPage,
  NotFound,
  ScrapbookView,
  BookShelfView,
  UserHome,
  LocationSearchInput,
  StreetView,
  Map,
  ScrapbookInstructions,
  ViewOnlyScrapbook,
} from './components';
import { Box, Heading } from 'grommet';
import firebase, { auth, firestore } from '../index';
import SinglePage from './components/scrapbook/SinglePage';
import Default from './components/scrapbook/layouts/Default';
// import CaptionTop from "./components/scrapbook/layouts/CaptionTop";
import CaptionBottom from './components/scrapbook/layouts/CaptionBottom';
import CaptionMiddle from './components/scrapbook/layouts/CaptionMiddle';

export default class routes extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      email: '',
      name: '',
    };
  }
  async componentDidMount() {
    firebase.auth().onAuthStateChanged(async (auth) => {
      if (auth) {
        const email = auth.email;
        // User is signed in. Uses email to find uid from db
        const usersRef = firestore.collection('Users');
        const user = await usersRef.where('email', 'in', [email]).get();
        if (!user) {
          console.log('No user found');
          this.setState({
            userId: '',
            email: '',
            name: '',
          });
        } else {
          console.log('User found');
          this.setState({
            userId: user.docs[0].id,
            email: email,
            name: auth.displayName,
          });
        }
      } else {
        // No user is signed in.
        console.log('Not logged in');
        this.setState({
          userId: '',
          email: '',
          name: '',
        });
      }
    });
  }

  render() {
    if (auth.currentUser) {
      return (
        <Box justify="center" align="center" height="100vh">
          <Switch>
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
            <Route
              exact
              path="/"
              component={() => (
                <UserHome
                  userId={auth.currentUser ? this.state.userId : false}
                  email={this.state.email}
                  name={this.state.name}
                />
              )}
            />
            <Route
              exact
              path="/scrapbooks/:scrapbookId"
              render={(props) => (
                <ScrapbookView
                  userId={this.state.userId}
                  params={props.match.params}
                  location={props.location}
                />
              )}
            />

            {/* <Route component={() => <NotFound isLoggedIn={true} />} /> */}
          </Switch>
        </Box>
      );
    } else {
      return (
        <Box justify="center" align="center" height="100vh">
          <Switch>
            <Route path="/demo">
              <ScrapbookView user={'demo'} />
            </Route>
            <Route path="/instructions">
              <ScrapbookInstructions user={'demo'} />
            </Route>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route
              path="/scrapbooks/:scrapbookId/share"
              render={(props) => (
                <ViewOnlyScrapbook
                  params={props.match.params}
                  location={props.location}
                />
              )}
            />
            <Route path="/bookshelf" component={BookShelfView} />
            <Route path="/test" component={LocationSearchInput} />
            <Route path="/streetview" component={StreetView} />
            {/* <Route path="/map" component={Map} /> */}
            <Route exact path="/" component={LandingPage} />

            {/* <Route component={() => <NotFound isLoggedIn={false} />} /> */}
          </Switch>
        </Box>
      );
    }
  }
}
