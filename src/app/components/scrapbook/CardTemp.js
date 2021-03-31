import React, { Component } from "react";
import {
  Box,
  Button,
  ResponsiveContext,
  Card,
  CardBody,
  Grommet,
  grommet,
  Text,
  Image,
} from "grommet";
import StreetView from "../map/360/StreetView";


const CardTemp = (props) => {
  const bookStyle = {
    position: "relative",
    alignItems: "stretch",
    display: "flex",
    height: "10%",
    width: "10%",
  };
  const cardStyle = {
    display: "flex",
    flex: true,
    pad: "medium",
    elevation: "medium",
    alignContent: "around",
    background: "light-1",
  };
  // console.log("the props", props);
  const { type, body } = props;
  return (
    <div>
      <article style={bookStyle}>
        <Grommet theme={grommet}>
          <Card style={cardStyle}>
            <CardBody>
              {type === "description" && <Text color="accent-1">{body}</Text>}

              {type === "image" && (
                <Box height="small" width="small" border>
                  <Image src={body} fit="contain" />
                </Box>
              )}
              {type === "panoramic" && (
                <Box>
                  <StreetView lat={body._lat} long={body._long} />
                </Box>
              )}
            </CardBody>
          </Card>
        </Grommet>
      </article>
    </div>
  );
};

export default CardTemp;
