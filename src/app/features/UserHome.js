import firebase, { auth, firestore } from '../../index';
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
  Form,
  FormField,
  TextInput,
} from 'grommet';
import { Modal } from 'rsuite';
import { Link } from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import BookCard from '../components/BookCard';
import history from '../history';

import React, { Component } from 'react';

export default class UserHome extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      scrapbooks: [],
      show: false,
      title: 'My Scrapbook',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.addNewScrapbook = this.addNewScrapbook.bind(this);
  }

  async componentDidMount() {
    const user = firebase.auth().currentUser;
    const userId = user.uid;
    const scrapbooks = await this.getScrapbooks(userId);
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

  toggleModal() {
    this.setState((prevState) => {
      return {
        show: !prevState.show,
      };
    });
  }

  async addNewScrapbook() {
    const user = firebase.auth().currentUser.uid;
    const collectionRef = await firestore.collection('Scrapbooks').add({
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
    });
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

  render() {
    // console.log('userHome props', this.props);
    const { user } = this.props;

    // map over scrapbooks and grab the following information:

    // console.log("userhome user", user);
    // scrapbook title
    // scapnook owner
    // scrapbook coverphoto
    // console.log('userhome state', this.state.scrapbooks);

    return (
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
              <Heading level={3}>welcome {user.email}</Heading>
              {this.state.scrapbooks.map((book) => {
                return <BookCard {...book} email={user.email} />;
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
