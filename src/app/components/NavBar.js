import React from "react";
import { Nav, Anchor, Text } from "grommet";
import { Link } from "react-router-dom";
import { auth } from "../../index";

export default function NavBar() {
  return (
    // <Box
    //   tag="header"
    //   direction="row"
    //   align="center"
    //   justify="between"
    //   background="light-2"
    //   pad={{ vertical: "small", horizontal: "medium" }}
    //   elevation="medium"
    // />
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
      <Link style={{ textDecoration: "none" }} to="/">
        <Text color="white">home</Text>
      </Link>

      <Link style={{ textDecoration: "none" }} to="/login">
        <Text color="white">login</Text>
      </Link>

      <Link style={{ textDecoration: "none" }} to="/signup">
        <Text color="white">sign up</Text>
      </Link>

      <Link style={{ textDecoration: "none" }} to="/bookshelf">
        <Text color="white">demo</Text>
      </Link>
    </Nav>
  );
}
