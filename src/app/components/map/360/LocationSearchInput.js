import React from 'react';
import firebase, { firestore } from '../../../../index';
import { Button, Box, Heading } from 'grommet';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import StreetView from './StreetView';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lat: 46.9171876,
      long: 17.8951832,
      searchBar: true,
      isClicked: false,
      buttonMessage: 'added!',
    };
    this.addCard = this.addCard.bind(this);
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      if (results) {
        const coords = await getLatLng(results[0]);
        this.setState({
          address: results[0].formatted_address,
          lat: coords.lat,
          long: coords.lng,
          searchBar: false,
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

  async addCard() {
    const pagesRef = firestore.collection('Pages');
    const singlePageRef = await pagesRef
      .where('scrapbookId', '==', this.props.scrapbookId)
      .where('pageNum', '==', this.props.currentPage)
      .get();

    if (singlePageRef.empty) {
      console.log('no matching documents');
      return;
    }

    const newCard = {
      body: new firebase.firestore.GeoPoint(this.state.lat, this.state.long),
      type: 'panoramic',
    };

    singlePageRef.forEach(async (doc) => {
      const queryRef = await firestore.collection('Pages').doc(doc.id);

      if (doc.data().cards.length >= 4) {
        this.setState({ buttonMessage: 'try again' });
        window.alert('Too many cards on this page!');
      } else {
        queryRef.update({
          cards: firebase.firestore.FieldValue.arrayUnion(newCard),
        });
      }
    });

    this.setState({ isClicked: true });
    this.props.setCards(newCard);
  }

  render() {
    return (
      <div>
         <Heading margin="10px" level={4}>
          Add a Panoramic View
        </Heading>
        <Box direction="row">
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
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
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
          <Button
          label="add"
          style={{ width: '100%' }} primary onClick={this.addCard}>
            {/* {this.state.isClicked ? this.state.buttonMessage : 'add'} */}
          </Button>
        </Box>
        <StreetView lat={this.state.lat} long={this.state.long} />
      </div>
    );
  }
}

export default LocationSearchInput;
