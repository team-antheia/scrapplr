import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, ButtonGroup, Navbar, Nav } from "rsuite";

export default function NavBar() {
  return (
    <div id="nav-container">
      <Navbar id="nav">
        <Navbar.Header>
          <a>scrapplr</a>
        </Navbar.Header>
        <Navbar.Body>
          <Nav>
            <NavLink to="/">
              <Button style={{ marginInline: 8 }} color="cyan">
                Home
              </Button>
            </NavLink>
            <Button style={{ marginInline: 8 }} color="cyan">
              Login
            </Button>
            <Button style={{ marginInline: 8 }} color="cyan">
              Sign-up
            </Button>
          </Nav>
          <Nav pullRight>
            <NavLink to="/demo">
              <Button style={{ marginInline: 8 }} color="orange">
                Demo
              </Button>
            </NavLink>
          </Nav>
        </Navbar.Body>
      </Navbar>
    </div>
  );
}
