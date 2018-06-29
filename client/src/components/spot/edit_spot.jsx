import React from "react";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { compose, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


class EditSpot extends React.Component {
    constructor(props) {
        super(props);

        this.state = props.spot;

        this.lat = 37.798965;
        this.lng = -122.4013603;
        // App Academy Coordinates

        this.markerLat;
        this.markerLng;
        
        this.handleCheckAddress = this.handleCheckAddress.bind(this);
        this.geocode = this.geocode.bind(this);

        this.renderMap = true;

    }

    handleAddressChange(val) {
        // e.preventDefault();
        
        // this.renderMap = true;
    
        // debugger
        return (e) => {

            this.setState({ [val]: e.currentTarget.value });
         
        }
    }

    handleCheckAddress(e) {
        e.preventDefault();

        this.geocode();
        
        // this.renderMap = true;
      
    }

    handleChange(val) {
        return (e) => {
            // debugger
            if (val === 'description') {
                this.state.description = e.currentTarget.value;
            }
        }
    }

    geocode() {
        // var location = '825 battery st. sf, ca';
        let axiosRequest = axios.create();
        axiosRequest.defaults.headers.common['Content-Type'] = 'application/json';
        delete axiosRequest.defaults.headers.common['Authorization'];
        // debugger
        var location = `${this.state.line1} + ${this.state.line2} + ${this.state.city} + ${this.state.state} + ${this.state.zipcode}`;
        
        axiosRequest.get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: location,
            key: 'AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg'
          }
        })
        .then(res => {
            // debugger
            this.lat = res.data.results[0].geometry.location.lat;
            this.lng = res.data.results[0].geometry.location.lng;

            // this.forceUpdate();

        })
        .catch(err => console.log("Please enter Address"))

        
    }

    render() {
        this.geocode();
        
        let renderMap;
        
        if (this.state.line1 !== '' && this.state.city !== '' && this.state.state.length >= 2 && this.state.zipcode.length >= 5 && this.renderMap) {
            
            var MyMapComponent = compose(
                withStateHandlers(() => ({
                    isMarkerShown: false,
                    markerPosition: null
                }), {
                        onMapClick: ({ isMarkerShown }) => (e) => {
                            // console.log(this)
                            return ({
                                markerPosition: e.latLng,
                                isMarkerShown: true
                            })
                        }
                    }),
                withScriptjs,
                withGoogleMap
            )
                (props => {
                    
                    // when the map is clicked, a marker is created and lat/lng is stored in this.state
                    if (props.markerPosition) {
                        this.state.latitude = props.markerPosition.lat();
                        this.state.longitude = props.markerPosition.lng();
                        
                        //tests out lat/lng coordinates
                        // console.log("latitude:");
                        // console.log(this.state.latitude);
                        // console.log("longitude:");
                        // console.log(this.state.longitude);
                        console.log(this.state)
                    }

                    return (
                        <GoogleMap
                            defaultZoom={18}
                            defaultCenter={{ lat: this.lat, lng: this.lng }}
                            onClick={props.onMapClick}
                        >
                            {props.isMarkerShown && <Marker position={props.markerPosition} />}

                        </GoogleMap>

                    )
                })

            renderMap = <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div className="myMapComponent" style={{ height: `400px`, width: `800px` }} />}
                mapElement={<div style={{ height: `100%` }} />} />
        } else {
            renderMap = <h3
                className="noMapComponent"
                style={{ height: `400px`, width: `800px` , border: '1px solid black' }}
              >
              </h3>;
        }

        // console.log(this.state) // for testing purposes

        return <div>
            <h4> Edit a Parking Spot </h4>

            <form>
              <button>Upload Image</button>
              <form className="Address" onSubmit={ this.handleCheckAddress } >
                <label> Address: </label>
                <div id="building-street">
                        <input type="text" placeholder="Building" onChange={this.handleAddressChange("line1")} value={this.state.line1} />
                        <input type="text" placeholder="Street" onChange={this.handleAddressChange("line2")} value={this.state.line2} />
                </div>
                <div id="city-state-zip">
                        <input type="text" placeholder="City/Town" onChange={this.handleAddressChange("city")} value={this.state.city} />
                  <input type="text" placeholder="State" onChange={this.handleAddressChange("state")} value={this.state.state} />
                  <input type="number" placeholder="Zip Code" onChange={this.handleAddressChange("zipcode")} value={this.state.zipcode} />
                </div>
                  <input type="submit" value="Check Address"></input>
              </form>

              {renderMap}

              <div>
                <label> Parking Space # (optional): </label>
                <input type="number" />
              </div>

              <div>
                <label> Vehicle Types Allowed </label>
                <input type="checkbox" id="motorcycle" name="vehicletype" value="Motorcycle" />
                <label htmlFor="motorcycle">Motorcycle</label>

                <input type="checkbox" id="car" name="vehicletype" value="Car" />
                <label htmlFor="car">Car</label>

                <input type="checkbox" id="compact" name="vehicletype" value="Compact" />
                <label htmlFor="compact">Compact</label>

                <input type="checkbox" id="fullsize" name="vehicletype" value="Fullsize" />
                <label htmlFor="fullsize">Fullsize</label>

                <input type="checkbox" id="truck" name="vehicletype" value="Truck" />
                <label htmlFor="truck">Truck</label>
              </div>

              <div>
                <label> Type of Parking </label>
                <input type="radio" id="garage" name="parkingtype" value="garage" />
                <label htmlFor="garage">Garage</label>

                <input type="radio" id="openparking" name="parkingtype" value="openparking" />
                <label htmlFor="openparking">Open Parking Lot</label>

                <input type="radio" id="canopyparking" name="parkingtype" value="canopyparking" />
                <label htmlFor="canopyparking">
                  Canopy Parking Lot
                </label>

                <input type="radio" id="undergroundparking" name="parkingtype" value="undergroundparking" />
                <label htmlFor="undergroundparking">
                  Underground Parking
                </label>
              </div>

              <div>
                <label> Gated? </label>
                <input type="checkbox" id="gated" name="gated" value="Yes-Gated" />
                <label htmlFor="gated">yes</label>
              </div>

              <div>
                <label> Term </label>
                <select>
                  <option hidden value="">
                    --Select One--
                  </option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label> Rate ($ per term) </label>
                <input type="number" />
              </div>

              <div>
                <label> Additional Information / Description: </label>
                <textarea onChange={this.handleChange("description")} />
              </div>

              <input type="submit" value="Update Parking Spot" />
            </form>
          </div>;
        
    }
};

export default withRouter(EditSpot);