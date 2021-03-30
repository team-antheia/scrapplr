import React, { Component } from 'react';
import {
  Box,
  Button,
  ResponsiveContext,
  Card,
  CardBody,
  Grommet,
  grommet,
  Text,
} from 'grommet';

const SinglePage = (props) => {
  const bookStyle = {
    position: 'relative',
    alignItems: 'stretch',
    display: 'flex',
    height: '100%',
    width: '100%',
  };

  const pages = props;
  return (
    <div>
      {pages.map((page) => {
        return (
          <article style={bookStyle}>
            <Grommet theme={grommet}>
              <Card>
                <CardBody
                  display='flex'
                  flex='true'
                  pad='medium'
                  elevation='medium'
                  alignContent='around'
                  background='light-1'
                >
                  <h1>{props.pageTitle}</h1>
                </CardBody>
              </Card>
            </Grommet>
          </article>
        );
      })}
    </div>
  );
};

export default SinglePage;
