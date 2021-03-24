import React from "react";
import { NavBar } from "./components";
import { Router } from "react-router-dom";
import Routes from "./routes";
import history from "./history";
import { Box } from "grommet";
import "./index.css";

function App() {
  return (
    <Box height={{ min: "100vh", max: "100%" }} align="center">
      <Router history={history}>
        <NavBar />
        <Routes />
      </Router>
    </Box>
  );
}

export default App;
