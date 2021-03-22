
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import store from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCL1mh7NIp8iNfow1PgSPBkD76Om_XrhB0',
  authDomain: 'team-antheia-capstone.firebaseapp.com',
  projectId: 'team-antheia-capstone',
  storageBucket: 'team-antheia-capstone.appspot.com',
  messagingSenderId: '790939626127',
  appId: '1:790939626127:web:45df9ee2fd8b0732c75efa',
  measurementId: 'G-NF36NH4Y6Y',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export { storage, auth, firestore, firebase as default };
