import { useState } from 'react';
import firebase, { auth } from '../../index';
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

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const settingEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const signInWithEmail = (evt) => {
    //evt.preventDefault();
    //WOULD WE WANT TO TRIGGER THIS WHEN THE USER IS DONE INPUTTING FIELDS ??
    firebase
      .auth()
      //THIS IS BEING GRABBED FROM STATE BEFORE THE STATE IS READY??
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in user - can add functionality
        var user = userCredential.user;
        props.history.push('/login');
      })
      .catch((error) => {
        //consle is loggin the error everytime we type...why is that??
        console.log('IN HERE', error);
      });
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });

  return (
    <div>
      {user.email ? (
        <>
          <Heading level={3}>welcome {user.email}</Heading>
          <Button
            label='sign out'
            onClick={() => {
              auth.signOut();
              props.history.push('/login');
            }}
          />
        </>
      ) : (
        <Box pad='small'>
          <Form onSubmit={signInWithEmail()}>
            <Heading level={3}>login</Heading>
            <FormField>
              <TextInput
                type='email'
                value={email}
                placeholder='email'
                onChange={settingEmail}
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
              type='submit'
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
      )}
    </div>
  );
}
