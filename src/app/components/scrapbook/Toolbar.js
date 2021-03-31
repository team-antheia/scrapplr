import React, { useState } from 'react';
import { PhotoUpload } from '../../components';
import { LocationSearchInput } from '../../components';
import { grommet, Box, Text, FormField } from 'grommet';

//Each component (or toolbar?) must make post request to db with new card info

const Toolbar = (props) => {
  return (
    <div>
      <PhotoUpload scrapbookId={props.scrapbookId} /*layout={props.layout}*/ />
      <LocationSearchInput />
      <Text for="description">Description</Text>
      <textarea
        id="description"
        name="description"
        rows="4"
        cols="50"
      ></textarea>
    </div>
  );
};

export default Toolbar;
