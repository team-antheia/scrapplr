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
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await user.updateProfile({
          displayName: username,
        });
        // Signed in user - can add functionality
        firestore.collection('Users').add({
          email: user.email,
          name: user.displayName,
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    signUp();
    props.history.push('/home');
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
