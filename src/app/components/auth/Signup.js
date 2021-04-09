import { Button, Form, FormField, Heading, Text, TextInput } from 'grommet';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase, { firestore } from '../../../index';

export function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');

  const signUp = () => {
    const userRef = firestore.collection('Users').doc();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await user.updateProfile({
          displayName: username,
        });
        userRef.set({
          email: user.email,
          name: user.displayName,
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });

    addFirstScrapbook(userRef.id);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    signUp();
    props.history.push('/home');
  };

  const addFirstScrapbook = async (userId) => {
    const scrapbookRef = firestore.collection('Scrapbooks').doc();

    let newScrapbook = {
      title: 'My First Scrapbook',
      collaborators: [],
      coverImageUrl:
        'https://media.cntraveler.com/photos/53fc86a8a5a7650f3959d273/master/pass/travel-with-polaroid-camera.jpg',
      mapLocations: [
      ],
      owner: userId,
      scrapbookId: scrapbookRef.id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await scrapbookRef.set(newScrapbook);

    const firstPage = {
      cards: [
        { type: 'static-map', body: 'mapContainer' },
        { type: 'title', body: 'My First Scrapbook' },
      ],
      layout: [
        { name: 'media', start: [0, 0], end: [1, 1] },
        { name: 'caption', start: [0, 2], end: [1, 2] },
      ],
      pageNum: 1,
      pageTitle: `firstPage`,
      scrapbookId: scrapbookRef.id,
    };

    //  New scrapbook page needs to be added with new scrapbook
    const firstPageRef = await firestore
      .collection('Pages')
      .doc()
      .set(firstPage);

    const pagesRef = firestore.collection('Pages').add({
      cards: [],
      layout: [
        { name: 'top', start: [0, 0], end: [1, 0] },
        { name: 'midLeft', start: [0, 1], end: [0, 1] },
        { name: 'midRight', start: [1, 1], end: [1, 1] },
        { name: 'bot', start: [0, 2], end: [1, 2] },
      ],
      pageNum: "",
      pageTitle: "",
      scrapbookId: scrapbookRef.id,
    });
  };

  return (
    <div>
      <div>
        <Form onSubmit={handleSumbit}>
          <Heading level="1">
            sign up for{' '}
            <Link style={{ textDecoration: 'none' }} to="/">
              scrapplr
            </Link>{' '}
          </Heading>
          <Text>fill in the form below to create an account.</Text>

          <FormField>
            <TextInput
              placeholder="email"
              value={email}
              type="email"
              onChange={(evt) => setEmail(evt.target.value)}
            ></TextInput>
          </FormField>
          <FormField>
            <TextInput
              placeholder="username"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            ></TextInput>
          </FormField>
          <FormField>
            <TextInput
              placeholder="password"
              onChange={(evt) => setPassword(evt.target.value)}
              value={password}
              type="password"
            ></TextInput>
          </FormField>
          <Text size="xsmall">password must be at least 6 characters.</Text>
          {error ? console.log(error) : ''}
          {error && <Text>{error}</Text>}
          <div>
            <Button label="sign up" type="submit" />
          </div>
          <hr></hr>
          <Text>
            already have an account? <Link to="/login">login</Link>
          </Text>
        </Form>
      </div>
    </div>
  );
}
