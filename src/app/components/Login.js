import { useState } from 'react';
import firebase, { auth } from '../../index';

export function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const signInWithEmail = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in user - can add functionality
        var user = userCredential.user;
        props.history.push('/login');
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
      {user.email ? (
        <>
          <p>Welcome {user.email}</p>
          <button
            onClick={() => {
              auth.signOut();
              props.history.push('/login');
            }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <form onSubmit={signInWithEmail(email, password)}>
            <h3>Login</h3>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <button type="submit" onClick={signInWithEmail}>
              Login
            </button>
            <p className="forgot-password text-right">
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </form>
          <button className="sign-in" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </>
      )}
    </div>
  );
}
