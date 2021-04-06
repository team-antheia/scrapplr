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
      showEdit: false,
      title: 'My Scrapbook',
      selectedScrapbook: '',
      hoverTarget: '',
      currentScrapbookTitle: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getScrapbooks = this.getScrapbooks.bind(this);
    this.addNewScrapbook = this.addNewScrapbook.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.editBook = this.editBook.bind(this);
    this.updateScrapbook = this.updateScrapbook.bind(this);
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
      .orderBy('timestamp')
      .get();
    if (queryRef.empty) {
      console.log('no matching documents');
      return;
    }
    // changed this so that previous state woulnd't get spread into current state
    const scrapbooks = [];
    queryRef.forEach((doc) => {
      scrapbooks.push(doc.data());
    });

    // this makes it so that old scrapbooks never get added to state
    this.setState({ scrapbooks: scrapbooks });
    return;
  }

  async handleDelete(scrapbookId) {
    //QUERY FOR THAT SCARPBOOK
    const book = await firebase
      .firestore()
      .collection('Scrapbooks')
      .doc(scrapbookId);
    await book
      .delete()
      .then(() => {
        console.log('deleted');
      })
      .catch((error) => {
        console.log('ohs nos!!', error);
      });
    this.getScrapbooks(this.props.userId);
  }

  toggleModal() {
    this.setState((prevState) => {
      return {
        show: !prevState.show,
      };
    });
  }

  editBook(title, id) {
    this.setState({
      selectedScrapbook: id,
      currentScrapbookTitle: title,
      showEdit: true,
    });
  }

  async updateScrapbook(id) {
    const scrapbookRef = firestore.collection('Scrapbooks').doc(id);

    await scrapbookRef.update({ title: this.state.currentScrapbookTitle });
    this.getScrapbooks(this.props.userId);
    this.setState({ showEdit: false });
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
          coordinates: new firebase.firestore.GeoPoint(40.7812, -73.9665),
          name: 'Central Park, NY',
        },
      ],
      owner: user,
      scrapbookId: scrapbookRef.id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await scrapbookRef.set(newScrapbook);

    // const firstPage = {
    //   cards: [
    //     { type: 'static-map', body: 'mapContainer' },
    //     { type: 'title', body: this.state.title },
    //   ],
    //   layout: [
    //     { name: 'media', start: [0, 0], end: [1, 1] },
    //     { name: 'caption', start: [0, 2], end: [1, 2] },
    //   ],
    //   pageNum: 1,
    //   pageTitle: `firstPage`,
    //   scrapbookId: scrapbookRef.id,
    // };

    //  New scrapbook page needs to be added with new scrapbook
    // const firstPageRef = await firestore
    //   .collection('Pages')
    //   .doc()
    //   .set(firstPage);

    const pagesRef = await firestore.collection('Pages').add({
      cards: [
        // { type: 'text', body: 'new page' },
        // {
        //   type: 'image',
        //   body: 'https://static.thenounproject.com/png/558475-200.png',
        // },
        // { type: 'text', body: 'or text' },
        // { type: 'text', body: 'or even a street view' },
      ],
      layout: [
        { name: 'top', start: [0, 0], end: [1, 0] },
        { name: 'midLeft', start: [0, 1], end: [0, 1] },
        { name: 'midRight', start: [1, 1], end: [1, 1] },
        { name: 'bot', start: [0, 2], end: [1, 2] },
      ],
      pageNum: 1,
      pageTitle: 'edit page to add content',
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
  handleEditChange(e) {
    this.setState({
      currentScrapbookTitle: e.target.value,
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
      <Box pad="small">
        <ResponsiveContext.Consumer>
          {(size) => (
            <Box
              align="center"
              height="85vh"
              width={size === 'small' ? '80vw' : '75vw'}
              direction="column"
              pad="small"
            >
              <Button label="add a new book" onClick={this.toggleModal} />

              <Heading level={3}>welcome {this.props.name}</Heading>
              {this.state.scrapbooks.map((book, i) => {
                return (
                  <div
                    onMouseOver={() => {
                      this.setState({ hoverTarget: book.scrapbookId });
                    }}
                    onMouseLeave={() => {
                      this.setState({ hoverTarget: '' });
                    }}
                    style={{
                      width: '75vw',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    key={i}
                  >
                    <BookCard
                      {...book}
                      email={this.props.email}
                      name={this.props.name}
                      selectedScrapbook={this.state.selectedScrapbook}
                      onSelect={this.onSelect}
                    />
                    <Box justify="center" align="center" direction="row">
                      <Button
                        // style={{ position: 'static', right: 100 }}
                        alignSelf="center"
                        style={{
                          visibility:
                            this.state.hoverTarget === book.scrapbookId
                              ? 'visible'
                              : size === 'small'
                              ? 'visibile'
                              : 'hidden',
                        }}
                        label="edit book"
                        onClick={() =>
                          this.editBook(book.title, book.scrapbookId)
                        }
                      />
                      <Button
                        // style={{ position: 'static', right: 100 }}
                        alignSelf="center"
                        color="status-critical"
                        primary
                        margin="small"
                        style={{
                          visibility:
                            this.state.hoverTarget === book.scrapbookId
                              ? 'visible'
                              : size === 'small'
                              ? 'visibile'
                              : 'hidden',
                        }}
                        label="DELETE book"
                        onClick={() => this.handleDelete(book.scrapbookId)}
                      />
                    </Box>
                  </div>
                );
              })}

              <Button primary label="logout" onClick={this.handleLogout} />
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
            <Button margin="small" onClick={this.toggleModal} label="close" />
          </Modal>
        </Box>
        <Box>
          <Modal
            style={{ maxWidth: '100vw' }}
            overflow={true}
            backdrop={true}
            show={this.state.showEdit}
          >
            <Form>
              <FormField>
                <TextInput
                  placeholder="scrapbook title"
                  name="title"
                  onChange={(evt) => this.handleEditChange(evt)}
                  value={this.state.currentScrapbookTitle}
                  type="text"
                ></TextInput>
              </FormField>
              <Button
                onClick={() =>
                  this.updateScrapbook(this.state.selectedScrapbook)
                }
                label="update scrapbook"
              />
            </Form>
            <Button
              margin="small"
              onClick={() => {
                this.setState({
                  selectedScrapbook: '',
                  currentScrapbookTitle: '',
                  showEdit: false,
                });
              }}
              label="close"
            />
          </Modal>
        </Box>
      </Box>
    );
  }
}
