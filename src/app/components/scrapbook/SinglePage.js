import React from "react";
import { Card, CardBody } from "grommet";

const SinglePage = (props) => {
  const bookStyle = {
    position: "relative",
    alignItems: "stretch",
    display: "flex",
    height: "100%",
    width: "100%",
  };

  const pages = props;
  return (
    <div>
      {pages.map((page) => {
        return (
          <article style={bookStyle}>
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
          </article>
        );
      })}
    </div>
  );
};

export default SinglePage;
