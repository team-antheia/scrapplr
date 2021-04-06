import { Box, Button } from 'grommet';
import React, { Component } from 'react';
import firebase,{ firestore } from '../../../../index';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import Map from './GoogleMap';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      location: '',
      lat:'',
      long:'',
      scrapbookId: '',
      address:'',
      searchBar:true
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.scrapbookId) {
      const getDocs = firestore
        .collection('Scrapbooks')
        .doc(this.props.scrapbookId)
        .get();
      const doc = await getDocs;
      if (doc) {
        const data = doc.data();
        this.setState({ locations: data.mapLocations });
      }
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

  handleChange = (address) => {
    this.setState({ address });

  };

  formatLocation(result, coordinates){
    const {lat, lng} = coordinates;
    return {
      coordinates: {_lat:lat, _long:lng},
      name:  result.formatted_address,
    };
  }

  handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      if (results) {
        const coords = await getLatLng(results[0]);
        const newLocation = this.formatLocation(results[0], coords);
        this.setState({
          address: results[0].formatted_address,
          lat: coords.lat,
          long: coords.lng,
          searchBar: false,
          location: newLocation
        });
        // adds location and name to mapLocations
        let scrapbookRef = firestore
          .collection('Scrapbooks')
          .doc(this.props.scrapbookId);
        await scrapbookRef.update({
          mapLocations: firebase.firestore.FieldValue.arrayUnion({
            coordinates: new firebase.firestore.GeoPoint(
              this.state.lat,
              this.state.long
            ),
            name: this.state.address,
          }),
        });
      }
    } catch (error) {
      console.log('Location not found', error);
    }
  };



  async onSubmit(event) {
    event.preventDefault();

    this.setState({
      location: '',
      address: '',
      locations: [...this.state.locations, this.state.location]
    })}


  render() {

    const allLocations = this.state.locations || [];
    return (
      <Box width="large">
        <div className="form">

        <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
                />
                <Button style={{ width: '40%' }} label="Submit"
                onClick={this.onSubmit}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            </PlacesAutocomplete>
        </div>

          {allLocations.length && <Map
            allLocations={allLocations}
            onMarkerClick={this.onMarkerClick}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
            selectedPlace={this.state.selectedPlace}
          />}

      </Box>
    );
  }
}

export default MapContainer;
