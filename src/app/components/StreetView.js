import React from "react";
import ReactStreetview from "react-google-streetview";

const StreetView = (props) => {
  // API key from env file
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const streetViewPanoramaOptions = {
    position: { lat: 46.9171876, lng: 17.8951832 },
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
  };
  if (props.lat) {
    console.log("in the if");
    streetViewPanoramaOptions.position = { lat: props.lat, lng: props.long };
  }
  console.log("in streetview", streetViewPanoramaOptions);
  return (
    <div
      style={{
        width: "400px",
        height: "150px",
        backgroundColor: "#eeeeee",
      }}
    >
      <ReactStreetview
        apiKey={googleMapsApiKey}
        streetViewPanoramaOptions={streetViewPanoramaOptions}
      />
    </div>
  );
};

export default StreetView;
