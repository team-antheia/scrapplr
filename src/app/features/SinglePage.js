import React, { Component } from "react";
import FlipPage from "react-flip-page";
import Page1 from "./demo/DemoPage1";
import { Modal } from "rsuite";
import {
  Box,
  Button,
  ResponsiveContext,
  Card,
  CardBody,
  Grommet,
  grommet,
  Text,
} from "grommet";

const SinglePage = (props) => {
  const bookStyle = {
    position: "relative",
    alignItems: "stretch",
    display: "flex",
    height: "100%",
    width: "100%",
  };
  const size = React.useContext(ResponsiveContext);

  console.log("the props in the card", props);
  const pages = props
  return (
    <div>
      {pages.map((page)=>{
        return(
          <article style={bookStyle} >
            <Grommet theme={grommet}>
          <Card>
            <CardBody
              display="flex"
              flex="true"
              pad="medium"
              elevation="medium"
              alignContent="around"
              background="light-1"
            >
              <h1>{props.pageTitle}</h1>
            </CardBody>
          </Card>
        </Grommet>
          </article>
        )
      })}
    </div>
  )
};

export default SinglePage;
