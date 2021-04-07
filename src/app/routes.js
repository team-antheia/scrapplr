import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  SignUp,
  LandingPage,
  NotFound,
  ScrapbookView,
  UserHome,
  LocationSearchInput,
  StreetView,
  ScrapbookInstructions,
  ViewOnlyScrapbook,
} from './components';
import { Box, Text } from 'grommet';
import firebase, { auth, firestore } from '../index';

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
            <Route path="/demo">
              <Box>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/d_x4B5JRLZo"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </Box>
              <> </>
              <ScrapbookInstructions user={'demo'} />
            </Route>
            {/* <Route component={() => <NotFound isLoggedIn={true} />} /> */}
          </Switch>
        </Box>
      );
    } else {
      return (
        <Box justify="center" align="center" height="100vh">
          <Switch>
            <Route path="/demo">
              <Box>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/yC6OwubFBbM"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </Box>
              <> </>
              <ScrapbookInstructions user={'demo'} />
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
            <Route path="/test" component={LocationSearchInput} />
            <Route path="/streetview" component={StreetView} />
            <Route exact path="/" component={LandingPage} />

            {/* <Route component={() => <NotFound isLoggedIn={false} />} /> */}
          </Switch>
        </Box>
      );
    }
  }
}
