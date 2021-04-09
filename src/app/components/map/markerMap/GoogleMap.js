import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Box } from 'grommet';

import LocationMarker from "./LocationMarker";

const key = process.env.REACT_APP_GOOGLE_API_KEY;
export const GoogleMap = (props) => {
  const mapStyles = {
    width: "95%",
    height: "70%",
  };

  return (
    <Box style={mapStyles}>
      {props.allLocations.length && (
        <Map
          google={props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: props.allLocations[0].coordinates._lat,
            lng: props.allLocations[0].coordinates._long,
          }}
        >
          {props.allLocations.map((location) => {
            return <LocationMarker location={location} />;
          })}
        </Map>
      )}
    </Box>
  );
};
export default GoogleApiWrapper({
  apiKey: key,
})(GoogleMap);
