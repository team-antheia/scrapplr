import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import ReactStreetview from 'react-streetview';

export class StreetView extends Component {
  //WE WILL TO PASS PROPS OR HAVE STATE HERE IN ORDER TO GET THE LOCATION THAT WE DESIRE RENDERED?
  render() {
    // API key from env file
    const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
    const streetViewPanoramaOptions = {
      position: { lat: 46.9171876, lng: 17.8951832 },
      pov: { heading: 100, pitch: 0 },
      zoom: 1,
    };

    return (
      <div
        style={{
          width: '400px',
          height: '150px',
          backgroundColor: '#eeeeee',
        }}
      >
        <ReactStreetview
          apiKey={googleMapsApiKey}
          streetViewPanoramaOptions={streetViewPanoramaOptions}
        />
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById('app'));

export default StreetView;
