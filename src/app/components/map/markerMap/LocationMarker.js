import React, { Component } from 'react';
import { Marker, InfoWindow } from 'google-maps-react';

class LocationMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCenter: '',
      setSelectedCenter: false,
    };
  }

  render() {
    const { name, coordinates } = this.props.location;
    const { _lat, _long } = coordinates;

    return (
      <div>
        <Marker
          {...this.props}
          key={name}
          title={name}
          name={name}
          position={{ lat: _lat, lng: _long }}
          onClick={() => {
            this.setState({
              setSelectedCenter: true,
            });
          }}
        />
        {this.state.selectedCenter && (
          <InfoWindow
            onClose={() => {
              this.setState({
                setSelectedCenter: false,
              });
            }}
            position={{
              lat: _lat,
              lng: _long,
            }}
          ></InfoWindow>
        )}
      </div>
    );
  }
}

export default LocationMarker;
