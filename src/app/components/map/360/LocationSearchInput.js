import React from 'react';
import firebase, { firestore } from '../../../../index';
import { Button, Box } from 'grommet';
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
          .doc('XQkebrXC1teAOhImleg3');
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
      .get();
    //^^^ When we know what page the user is on, insert query here ^^^
    // .where('pageNum', '==', props.pageNum)

    if (singlePageRef.empty) {
      console.log('no matching documents');
      return;
    }

    singlePageRef.forEach(async (doc) => {
      console.log('page id', doc.id);
      const queryRef = await firestore.collection('Pages').doc(doc.id);

      if (doc.data().cards.length >= 4) {
        this.setState({ buttonMessage: 'try again' });
        window.alert('Too many cards on this page!');
      } else {
        queryRef.update({
          cards: firebase.firestore.FieldValue.arrayUnion({
            body: new firebase.firestore.GeoPoint(
              this.state.lat,
              this.state.long
            ),
            type: 'panoramic',
            //layout: props.layout
          }),
        });
      }
    });

    this.setState({ isClicked: true });
    this.props.setCards();
  }

  render() {
    return (
      <div>
        <Box direction="row">
          <Button style={{ width: '40%' }} primary onClick={this.addCard}>
            {this.state.isClicked ? this.state.buttonMessage : 'add'}
          </Button>
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
        </Box>
        <StreetView lat={this.state.lat} long={this.state.long} />
      </div>
    );
  }
}

export default LocationSearchInput;
