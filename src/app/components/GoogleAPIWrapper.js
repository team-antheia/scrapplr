import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '75%',
  height: '75%',
};

const key = process.env.REACT_APP_GOOGLE_API_KEY;

export class MapContainer extends Component {
  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={4}
          style={mapStyles}
          initialCenter={{
            lat: -1.2884,
            lng: 36.8233,
          }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: key,
})(MapContainer);
