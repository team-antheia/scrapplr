import { firestore } from '../../index';
import firebase from 'firebase/app';

import {
  Heading,
  Button,
  Box,
  ResponsiveContext,
  Form,
  FormField,
  TextInput,
  Spinner,
} from 'grommet';
import { Modal } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import BookCard from './scrapbook/BookCard';
import { history } from '../index';

import React, { Component } from 'react';

export default class UserHome extends Component {
  constructor() {
    super();

    this.state = {
      scrapbooks: [],
      show: false,
      title: 'My Scrapbook',
      selectedScrapbook: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getScrapbooks = this.getScrapbooks.bind(this);
    this.addNewScrapbook = this.addNewScrapbook.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  async componentDidMount() {
    //User is logged in
    if (this.props.userId) {
      // User is signed in.
      const userId = this.props.userId;
      this.getScrapbooks(userId);
    } else {
      // No user is signed in.
      console.log('Not logged in');
    }
  }

  async getScrapbooks(userId) {
    const scrapbooksRef = firestore.collection('Scrapbooks');
    const queryRef = await scrapbooksRef
      .where('owner', '==', userId)
      .orderBy('timestamp', 'desc')
      .get();
    if (queryRef.empty) {
      console.log('no matching documents');
      return;
    }
    queryRef.forEach((doc) => {
      console.log(doc.data());
      this.setState({
        scrapbooks: [...this.state.scrapbooks, doc.data()],
      });
    });
    return;
  }

  toggleModal() {
    this.setState((prevState) => {
      return {
        show: !prevState.show,
      };
    });
  }

  async addNewScrapbook() {
    const user = this.props.userId;
    const scrapbookRef = firestore.collection('Scrapbooks').doc();

    let newScrapbook = {
      title: this.state.title,
      collaborators: [],
      coverImageUrl:
        'https://media.cntraveler.com/photos/53fc86a8a5a7650f3959d273/master/pass/travel-with-polaroid-camera.jpg',
      mapLocations: [
        {
          coordinates: new firebase.firestore.GeoPoint(40.7128, 74.006),
          name: 'New York, NY',
        },
      ],
      owner: user,
      pages: [],
      scrapbookId: scrapbookRef.id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await scrapbookRef.set(newScrapbook);

    //  New scrapbook page needs to be added with new scrapbook
    const pagesRef = firestore.collection('Pages').add({
      cards: [],
      layout: [],
      pageNum: '1',
      pageTitle: '',
      scrapbookId: scrapbookRef.id,
    });

    //Updates state to re-render the page
    this.setState({ scrapbooks: [newScrapbook, ...this.state.scrapbooks] });
    this.toggleModal();
  }

  handleChange(e) {
    this.setState({
      title: e.target.value,
    });
  }

  async handleLogout() {
    await firebase.auth().signOut();
    history.push('/login');
  }

  async onSelect(event, scrapbookId) {
    this.setState({
      selectedScrapbook: scrapbookId,
    });
  }

  render() {
    return !this.state.scrapbooks.length ? (
      <Spinner />
    ) : (
      <Box>
        <ResponsiveContext.Consumer>
          {(size) => (
            <Box
              align="center"
              height="85vh"
              width={size === 'small' ? '80vw' : '75vw'}
              direction="column"
            >
              <Button label="add a new book" onClick={this.toggleModal} />

              <Heading level={3}>welcome {this.props.name}</Heading>
              {this.state.scrapbooks.map((book) => {
                return (
                  <div>
                    <BookCard
                      {...book}
                      email={this.props.email}
                      name={this.props.name}
                      selectedScrapbook={this.state.selectedScrapbook}
                      onSelect={this.onSelect}
                    />
                  </div>
                );
              })}

              <Button label="logout" onClick={this.handleLogout} />
            </Box>
          )}
        </ResponsiveContext.Consumer>
        <Box>
          <Modal
            style={{ maxWidth: '100vw' }}
            overflow={true}
            backdrop={true}
            show={this.state.show}
          >
            <Form>
              <FormField>
                <TextInput
                  placeholder="scrapbook title"
                  name="title"
                  onChange={(evt) => this.handleChange(evt)}
                  value={this.state.title}
                  type="text"
                ></TextInput>
              </FormField>
              <Button onClick={this.addNewScrapbook} label="add scrapbook" />
            </Form>
            <Button onClick={this.toggleModal} label="close" />
          </Modal>
        </Box>
      </Box>
    );
  }
}
