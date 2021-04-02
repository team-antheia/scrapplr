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
        {
          coordinates: new firebase.firestore.GeoPoint(40.7128, 74.006),
          name: 'New York, NY',
        },
      ],
      owner: userId,
      pages: [],
      scrapbookId: scrapbookRef.id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    await scrapbookRef.set(newScrapbook);

    //  New scrapbook page needs to be added with new scrapbook
    const pagesRef = firestore.collection('Pages').add({
      cards: [
        {
          body:
            'https://specials-images.forbesimg.com/imageserve/930322352/960x0.jpg?fit=scale',
          type: 'image',
        },
        {
          body: 'Add descriptions to caption your pictures',
          type: 'description',
        },
        {
          body: new firebase.firestore.GeoPoint(-16.5004, -151.7415),
          type: 'panoramic',
        },
        {
          body: 'Upload panoramics to make your experiences come to life',
          type: 'description',
        },
      ],
      layout: [],
      pageNum: 1,
      pageTitle: 'My Trip To Bora Bora',
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
