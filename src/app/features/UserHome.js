import { auth, firestore } from '../../index';
import firebase from 'firebase/app';
import 'firebase/auth'; // 👈 this could also be in your `firebase.js` file
import {
  Heading,
  Button,
  Box,
  ResponsiveContext,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Text,
} from 'grommet';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import history from '../history';

import React, { Component } from 'react';

export default class UserHome extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      scrapbooks: [],
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.getScrapbooks = this.getScrapbooks.bind(this);
  }

  async componentDidMount() {
    //CURRENT USER IS NULL
    firebase.auth().onAuthStateChanged((user) => {
      console.log('in the new function');
      if (user) {
        console.log('user in userhome', user);
        // User is signed in.
        this.setState({ user: user });
        const userId = user.uid;

        const scrapbooks = this.getScrapbooks(userId);
      } else {
        // No user is signed in.
        console.log('Not logged in');
      }
    });
  }

  async getScrapbooks(userId) {
    const scrapbooksRef = firestore.collection('Scrapbooks');
    const queryRef = await scrapbooksRef.where('owner', '==', userId).get();
    console.log('userHome userId', userId);
    if (queryRef.empty) {
      console.log('no matching documents');
      return;
    }
    queryRef.forEach((doc) => {
      this.setState({
        scrapbooks: [...this.state.scrapbooks, doc.data()],
      });
    });
    return;
  }

  async handleLogout() {
    await firebase.auth().signOut();
    history.push('/login');
  }

  render() {
    // console.log('userHome props', this.props);
    // const { history, user } = this.props;

    // map over scrapbooks and grab the following information:

    // console.log("userhome user", user);
    // scrapbook title
    // scapnook owner
    // scrapbook coverphoto
    //console.log('userhome state', this.props);

    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box
            align='center'
            height='85vh'
            width={size === 'small' ? '80vw' : '75vw'}
            direction='column'
          >
            <Heading level={3}>welcome {this.state.user.email}</Heading>
            {this.state.scrapbooks.map((book) => {
              console.log('mapping');
              return <BookCard {...book} email={this.state.user.email} />;
            })}
            <Button label='logout' onClick={this.handleLogout} />
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}
