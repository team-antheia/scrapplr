import React, { Component } from "react";
import { firestore } from "../../index";
import  Map  from "./GoogleMap";


const key = process.env.REACT_APP_GOOGLE_API_KEY;

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      // showingInfoWindow: false,
      // activeMarker: {},
      // selectedPlace: {},
      // have name and longitude and latitude in an object
      locations:[],
      location:'',
      scrapbookId:''
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount(){
     const getDocs = firestore.collection("SingleSB").doc("Mh3xCoVCvPuCZYXIH2WO").get();
     const doc = await getDocs;
     if(doc){
       const data = doc.data();
       this.setState({locations:data["Map Locations"]})
     }
    console.log('data outside', this.state.locations)
}


  onMarkerClick(props, marker, e){
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
    const newLocations =this.state.locations.push(this.state.location)
    this.setState({
      location:'',
      locations: newLocations
    });
  }
  render() {
    const allLocations = this.state.locations
    // console.log('long', allLocations[0].Coordinates.Latitude)
    if(allLocations.length){
      console.log(allLocations[0].Coordinates._lat, typeof allLocations[0].Coordinates._lat);
    }
    return (
      <div>
        <div className="form">
          <form>
            <label htmlFor="location">Add Location </label>
            <input
              type="text"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
            />
            <button
              onClick={this.onSubmit}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <Map
         allLocations={allLocations}
         onMarkerClick={this.onMarkerClick}
         visible={this.state.showingInfoWindow}
         onClose={this.onClose}
         selectedPlace={this.state.selectedPlace}
         />
      </div>
    );
  }
}

export default MapContainer;