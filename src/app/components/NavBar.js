import React from 'react';
import { Nav, Text } from 'grommet';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Nav
      width="100vw"
      tag="header"
      background="control"
      elevation="large"
      direction="row"
      pad="8px"
      align="center"
      justify="center"
      height="48px"
    >
      <Link style={{ textDecoration: 'none' }} to="/">
        <Text color="white">home</Text>
      </Link>

      <Link style={{ textDecoration: 'none' }} to="/login">
        <Text color="white">login</Text>
      </Link>

      <Link style={{ textDecoration: 'none' }} to="/signup">
        <Text color="white">sign up</Text>
      </Link>

      <Link style={{ textDecoration: 'none' }} to="/demo">
        <Text color="white">demo</Text>
      </Link>
    </Nav>
  );
}
