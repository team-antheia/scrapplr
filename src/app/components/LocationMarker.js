import React, { Component } from "react";
import {Marker, InfoWindow} from "google-maps-react";
class LocationMarker extends Component {
  constructor(props){
    super(props);
    this.state = {
      // open: false, visible: false}
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }

  render() {
    const {Name, Coordinates} = this.props.location;
    const {_lat, _long} = Coordinates;


    return <Marker  key={Name} title={Name} name={Name} position={{ lat: _lat, lng: _long }}/>
    //     {/* {this.state.open && (
    //       <InfoWindow onClick={() => this.setState(state => ({open: !state.open}))}> {Name} </InfoWindow>
    //     )} */}

  }

}

export default LocationMarker;