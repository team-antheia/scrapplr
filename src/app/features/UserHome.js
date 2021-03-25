import firebase, { auth, firestore } from "../../index";
import {
  Heading,
  Button,
  Box,
  ResponsiveContext,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Text,
} from "grommet";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import history from "../history";

import React, { Component } from "react";

export default class UserHome extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      scrapbooks: [],
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  async componentDidMount() {
    const user = firebase.auth().currentUser;
    const userId = user.uid;
    const scrapbooks = await this.getScrapbooks(userId);
  }

  async getScrapbooks(userId) {
    const scrapbooksRef = firestore.collection("Scrapbooks");
    const queryRef = await scrapbooksRef.where("owner", "==", userId).get();
    console.log("userHome userId", userId);
    if (queryRef.empty) {
      console.log("no matching documents");
      return;
    }
    queryRef.forEach((doc) => {
      this.setState({
        scrapbooks: [...this.state.scrapbooks, doc.data()],
      });
    });
    return;
  }

  async handleLogout() {
    await firebase.auth().signOut();
    history.push("/login");
  }

  render() {
    console.log("userHome props", this.props);
    const { history, user } = this.props;

    // map over scrapbooks and grab the following information:

    // console.log("userhome user", user);
    // scrapbook title
    // scapnook owner
    // scrapbook coverphoto
    console.log("userhome state", this.state.scrapbooks);

    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box
            align="center"
            height="85vh"
            width={size === "small" ? "80vw" : "75vw"}
            direction="column"
          >
            <Heading level={3}>welcome {user.email}</Heading>
            {this.state.scrapbooks.map((book) => {
              console.log("mapping");
              return <BookCard {...book} email={user.email} />;
            })}
            <Button label="logout" onClick={this.handleLogout} />
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}
