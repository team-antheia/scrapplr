import {
  Box,
  Heading,
  ResponsiveContext,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "grommet";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class BookShelfView extends Component {
  render() {
    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box
            align="center"
            height="85vh"
            width={size === "small" ? "80vw" : "75vw"}
            direction="column"
          >
            <Heading>bookshelf</Heading>
            <Box pad={{ top: "large" }}>
              <Link to="/demo">
                <Card
                  elevation="medium"
                  height="small"
                  width="medium"
                  background="glass"
                >
                  <CardHeader style={{ color: "black" }} pad="small">
                    the old vibes
                  </CardHeader>
                  <CardBody background="glass" pad="small">
                    <Image
                      fit="cover"
                      src="https://miro.medium.com/max/960/1*8ZBg21hBXairvRaeI1qEmQ.jpeg"
                    />
                  </CardBody>
                  <CardFooter background="background-contrast" pad="small">
                    by grace hopper | march 2021
                  </CardFooter>
                </Card>
              </Link>
            </Box>
            <Box margin="small" pad={{ top: "large" }}>
              <Link to="/demo">
                <Card
                  elevation="medium"
                  height="small"
                  width="medium"
                  background="glass"
                >
                  <CardHeader style={{ color: "black" }} pad="small">
                    frenz 4 life
                  </CardHeader>
                  <CardBody background="glass" pad="small">
                    <Image
                      fit="cover"
                      src="https://cdn.vox-cdn.com/thumbor/yzePlAdBf52QI_l-PJrNidSS9Gs=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/15002495/friendscast.0.0.1429818191.jpg"
                    />
                  </CardBody>
                  <CardFooter background="background-contrast" pad="small">
                    by antheia | january 2021
                  </CardFooter>
                </Card>
              </Link>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}
