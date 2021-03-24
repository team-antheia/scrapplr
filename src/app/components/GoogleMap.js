import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import LocationMarker from "./LocationMarker";

const key = process.env.REACT_APP_GOOGLE_API_KEY;
export const GoogleMap = (props) => {
  const mapStyles = {
    width: "50%",
    height: "50%",
  };
  return (
    <div>
      {props.allLocations.length && (
        <Map
          google={props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: props.allLocations[0].Coordinates._lat,
            lng: props.allLocations[0].Coordinates._long,
          }}
        >
          {props.allLocations.length &&
            props.allLocations.map(
              (location) => (
                <Marker
                  key={location.Name}
                  title={location.Name}
                  name={location.Name}
                  position={{
                    lat: location.Coordinates._lat,
                    lng: location.Coordinates._long,
                  }}
                />
              )

              //  <LocationMarker location={location} key={location.Name} />
            )}
        </Map>
      )}
    </div>
  );
};
export default GoogleApiWrapper({
  apiKey: key,
})(GoogleMap);
