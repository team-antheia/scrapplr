import { useState } from 'react';
import firebase from 'firebase/app';

import { auth } from '../../../index';
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Text,
  TextInput,
} from 'grommet';
import { Link } from 'react-router-dom';
export function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const provider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
    props.history.push('/home');
  };

  const signInWithEmail = (evt) => {
    evt.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in user - can add functionality
        var user = userCredential.user;
        props.history.push('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });

  return (
    <div>
      <Box pad='small'>
        <Form>
          <Heading level={3}>login</Heading>
          <FormField>
            <TextInput
              type='email'
              value={email}
              placeholder='email'
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </FormField>
          <FormField>
            <TextInput
              type='password'
              value={password}
              placeholder='password'
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </FormField>
          <Button
            style={{ width: '100%' }}
            primary
            label='login'
            onClick={signInWithEmail}
          />
          <Box pad='small'>
            <Button
              style={{ width: '100%' }}
              label='sign in with google'
              onClick={signInWithGoogle}
            />
            <Text className='forgot-password text-right'>
              don't have an account? <Link to='/signup'>sign up</Link>
            </Text>
          </Box>
        </Form>
      </Box>
    </div>
  );
}
