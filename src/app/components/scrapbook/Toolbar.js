import React, { useState } from 'react';
import {
  PhotoUpload,
  LocationSearchInput,
  DescriptionForm,
} from '../../components';

//Each component (or toolbar?) must make post request to db with new card info

const Toolbar = (props) => {
  return (
    <div>
      <PhotoUpload scrapbookId={props.scrapbookId} /*layout={props.layout}*/ />
      <LocationSearchInput
        scrapbookId={props.scrapbookId} /*layout={props.layout}*/
      />
      <DescriptionForm
        scrapbookId={props.scrapbookId} /*layout={props.layout}*/
      />
    </div>
  );
};

export default Toolbar;
