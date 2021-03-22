import React from "react";
import { NavBar } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
//import { MapContainer } from './components/GoogleAPIWrapper';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
