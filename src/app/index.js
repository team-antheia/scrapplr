import React from 'react';
import { NavBar } from './components';
import { Router } from 'react-router-dom';
import Routes from './routes';
import history from './history';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <NavBar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
