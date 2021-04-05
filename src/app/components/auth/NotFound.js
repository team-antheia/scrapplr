import React from 'react';
import { Heading, Text } from 'grommet';
import { Link } from 'react-router-dom';

const NotFound = (props) => {
  return (
    <div>
      <Heading color="brand">Uh oh!</Heading>
      <Text>The page you are looking for is not found. </Text>
      {!props.isLoggedIn && (
        <Text>
          Did you mean to <Link to="/login">login</Link>?
        </Text>
      )}
    </div>
  );
};

export default NotFound;
