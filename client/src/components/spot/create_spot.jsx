import React from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


class CreateSpot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: {
                line1: '',
                line2: '',
                city: '',
                state: '',
                zipcode: undefined    
            },
            description: '',
            vehicle_types: [],
            spot_type: '',
            rental_rate: undefined,
            rental_type: '',
            img_url: '',
            reservations: []
        }

        this.geocode();
    }

    handleChange(val) {
        return (e) => this.setState({[val]: e.currentTarget.value})
    }

    geocode() {
        var location = '825 battery st. san francisco ca';
        
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: location,
            key: 'AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg'
          }
        })
        .then(res => {

            this.lat = res.data.results[0].geometry.location.lat;
            this.lng = res.data.results[0].geometry.location.lng;
        })
        .catch(err => console.log(err))
    }

    render() {


        const MyMapComponent = withScriptjs(withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={18}
                defaultCenter={{ lat: this.lat, lng: this.lng }}
            >
            </GoogleMap>
        )))

        return <div>
            <h4> Create a new Parking Spot </h4>

            <button>Upload Image</button>

            <div className="Address">
              <label> Address: </label>
              <div id="building-street">
                <input type="text" placeholder="Building" onChange={this.handleChange('line1')} value={this.state.line1} />
                <input type="text" placeholder="Street" value={this.state.line2} />
              </div>
              <div id="city-state-zip">
                <input type="text" placeholder="City/Town" value={this.state.city} />
                <input type="text" placeholder="State" value={this.state.state} />
                <input type="number" placeholder="Zip Code" value={this.state.zipcode} />
              </div>
            </div>

            <MyMapComponent googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg&callback=initMapes" loadingElement={<div style={{ height: `100%` }} />} containerElement={<div style={{ height: `300px`, width: `800px` }} />} mapElement={<div style={{ height: `100%` }} />} />
          </div>;
        
    }
};

export default withRouter(CreateSpot);