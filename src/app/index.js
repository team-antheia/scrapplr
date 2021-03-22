import React from 'react';
import { NavBar } from './components';
import Routes from './routes';
//import { MapContainer } from './components/GoogleAPIWrapper';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes />
    </div>
  );
}

export default App;
