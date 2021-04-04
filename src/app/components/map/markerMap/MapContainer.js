import { Box } from 'grommet';
import React, { Component } from 'react';
import { firestore } from '../../../../index';
import Map from './GoogleMap';

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      location: '',
      scrapbookId: '',
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    if (!this.props.mapLocations) {
      const getDocs = firestore
        .collection('Scrapbooks')
        .doc('XQkebrXC1teAOhImleg3')
        .get();
      const doc = await getDocs;
      if (doc) {
        const data = doc.data();
        this.setState({ locations: data.mapLocations });
      }
    } else if (this.props.mapLocations) {
      this.setState({ locations: this.props.mapLocations });
    }
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onClose(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  handleChange(event) {
    this.setState({
      location: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const newLocations = this.state.locations.push(this.state.location);
    this.setState({
      location: '',
      locations: newLocations,
    });
  }
  render() {
    const allLocations = this.state.locations;
    return (
      <Box style={{ width: '100%' }}>
        <div className="form">
          <form>
            <label htmlFor="location">Add Location </label>
            <input
              type="text"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
            />
            <button onClick={this.onSubmit} type="submit">
              Submit
            </button>
          </form>
        </div>
        <Box>
          <Map
            allLocations={allLocations}
            onMarkerClick={this.onMarkerClick}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
            selectedPlace={this.state.selectedPlace}
          />
        </Box>
      </Box>
    );
  }
}

export default MapContainer;
