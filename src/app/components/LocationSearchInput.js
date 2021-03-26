import React from "react";
import firebase, { firestore } from "../../index";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import StreetView from "./StreetView";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "", lat: "", long: "", searchBar:true };
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
          searchBar:false
        });
        // adds location and name to mapLocations
        let scrapbookRef = firestore
          .collection("Scrapbooks")
          .doc("XQkebrXC1teAOhImleg3");
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
      console.log("Location not found", error);
    }
  };

  addCard = () =>{

  }

  render() {
    return (
      // <div>
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
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
            <StreetView
            lat={this.state.lat}
            long={this.state.long}
             />
             {/* <button
             onClick=()
             >Add a Card</button> */}

          </div>
        )}
      </PlacesAutocomplete>

      // </div>
    );
  }
}

export default LocationSearchInput;
