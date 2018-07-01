import React from "react";
import $ from "jquery";
import Image from "react-image";
import { withRouter } from "react-router-dom";
import { compose, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { LOADING_GIF } from "../../img/index";
import "./edit_spot.css";

class EditSpot extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, props.spot);

    this.lat = 37.798965;
    this.lng = -122.4013603;
    // App Academy Coordinates

    this.markerLat; // WHAT IS THIS?
    this.markerLng; // WHAT IS THIS? PART OF TESTING? STILL NECESSARY?

    // this.forceUpdate = this.forceUpdate.bind(this);
    this.renderMapAfterTime = this.renderMapAfterTime.bind(this);
    this.geocode = this.geocode.bind(this);

    this.renderMap = true;

    this.timeout = undefined;

  }

  componentDidMount() {
    //requesting spot from backend...
    this.props.fetchSpotById(this.props.spotId);
  }

  componentWillUnmount() {
    //Erasing any errors...
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();

    this.state._id = this.props.spotId;
    this.state.seller_id = this.props.user.id;

    // debugger
    console.log(this.state)
    this.props.updateSpot(this.state);
  }

  handleAddressChange(val) {
    // console.log(this.renderMap);
    this.renderMap = false;

    return e => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.setState({ [val]: e.currentTarget.value });

      this.timeout = setTimeout(this.renderMapAfterTime, 1500);
    };
  }

  handleChange(val) {
    return e => {
      if (this.timeout) { clearTimeout(this.timeout) }
      
      if (val === "vehicle_type") {
        if (this.state.vehicle_types.includes(e.currentTarget.value)) {

          let arr = this.state.vehicle_types
          let index = arr.indexOf(e.currentTarget.value);

          arr.splice(index, 1)

        } else {
          this.state.vehicle_types.push(e.currentTarget.value);
        }

        this.forceUpdate();
      } else {

        this.setState({ [val]: e.currentTarget.value });
      }

      this.timeout = setTimeout(this.renderMapAfterTime, 1500);
    };
  }

  renderMapAfterTime() {
    this.renderMap = true;
    this.forceUpdate();
  }

  geocode() {

    var location = `${this.state.line1} + ${this.state.line2} + ${
      this.state.city
    } + ${this.state.state} + ${this.state.zipcode}`;
    $.ajax({
      method: "GET",
      url: "https://maps.googleapis.com/maps/api/geocode/json",
      data: {
        address: location,
        key: "AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg"
      }
    })
      // axiosRequest.get("https://maps.googleapis.com/maps/api/geocode/json", {
      //     params: {
      //         address: location,
      //         key: 'AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg'
      //     },
      // })
      .then(res => {
        // axiosRequest.defaults.headers.common['Authorization'] = auth;
        // debugger
        this.lat = res.results[0].geometry.location.lat;
        this.lng = res.results[0].geometry.location.lng;

        // this.forceUpdate();
      })
      .catch(err => console.log("Please enter Address"));
  }

  render() {
    let renderMap;

    if (this.state) {
      this.geocode();

  
      if (
        this.state.line1.length > 0 &&
        this.state.city.length > 0 &&
        this.state.state.length >= 2 &&
        this.state.zipcode.toString().length >= 5 &&
        this.renderMap
      ) {
        var MyMapComponent = compose(
          withStateHandlers(
            () => ({
              isMarkerShown: false,
              markerPosition: null
            }),
            {
              onMapClick: ({ isMarkerShown }) => e => {
                // console.log(this)
                return {
                  markerPosition: e.latLng,
                  isMarkerShown: true
                };
              }
            }
          ),
          withScriptjs,
          withGoogleMap
        )(props => {
          // when the map is clicked, a marker is created and lat/lng is stored in this.state
          if (props.markerPosition) {
            this.state.latitude = props.markerPosition.lat();
            this.state.longitude = props.markerPosition.lng();
  
            console.log(this.state);
          }
  
          return (
            <GoogleMap
              defaultZoom={18}
              defaultCenter={{ lat: this.lat, lng: this.lng }}
              onClick={props.onMapClick}
            >
              {props.isMarkerShown && <Marker position={props.markerPosition} />}
            </GoogleMap>
          );
        });
  
        renderMap = (
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                className="myMapComponent"
                style={{ height: `400px`, width: `800px` }}
              />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        );
      } else {
        renderMap = (
          <h5
            className="noMapComponent"
            style={{ height: `400px`, width: `800px` }}
          />
        );
      }


      return (

        <div>
          <h4> Edit a Parking Spot </h4>
  
          <form>
            <button>Upload Image</button>
            <div className="Address">
              <label> Address: </label>
              <div id="building-street">
                <input
                  type="text"
                  placeholder="Building"
                  onChange={this.handleAddressChange("line1")}
                  value={this.state.line1}
                />
                <input
                  type="text"
                  placeholder="Street"
                  onChange={this.handleAddressChange("line2")}
                  value={this.state.line2}
                />
              </div>
              <div id="city-state-zip">
                <input
                  type="text"
                  placeholder="City/Town"
                  onChange={this.handleAddressChange("city")}
                  value={this.state.city}
                />
                <input
                  type="text"
                  placeholder="State"
                  onChange={this.handleAddressChange("state")}
                  value={this.state.state}
                />
                <input
                  type="number"
                  placeholder="Zip Code"
                  onChange={this.handleAddressChange("zipcode")}
                  value={this.state.zipcode}
                />
              </div>
            </div>
  
            {renderMap}
  
            <div id="fixed">
  
              <div>
                <label> Vehicle Types Allowed </label>
                <input
                  type="checkbox"
                  id="motorcycle"
                  name="vehicletype"
                  value="motorcycle"
                  checked={this.state.vehicle_types.includes('motorcycle')}
                  onClick={this.handleChange("vehicle_type")}
                />
                <label htmlFor="motorcycle">Motorcycle</label>
  
                <input
                  type="checkbox"
                  id="compact"
                  name="vehicletype"
                  value="compact"
                  checked={this.state.vehicle_types.includes('compact')}
                  onClick={this.handleChange("vehicle_type")}
                />
                <label htmlFor="compact">Compact</label>
  
                <input
                  type="checkbox"
                  id="fullsize"
                  name="vehicletype"
                  value="sedan"
                  checked={this.state.vehicle_types.includes('sedan')}
                  onClick={this.handleChange("vehicle_type")}
                />
                <label htmlFor="fullsize">Sedan</label>
  
                <input
                  type="checkbox"
                  id="truck"
                  name="vehicletype"
                  value="truck"
                  checked={this.state.vehicle_types.includes('truck')}
                  onClick={this.handleChange("vehicle_type")}
                />
                <label htmlFor="truck">Truck</label>
              </div>
  
              <div>
                <label> Type of Parking </label>
                <input
                  type="radio"
                  id="covered"
                  name="parkingtype"
                  value="covered"
                  checked={this.state.spot_type == "covered"}
                  onClick={this.handleChange("spot_type")}
                />
                <label htmlFor="covered">Covered</label>
  
                <input
                  type="radio"
                  id="uncovered"
                  name="parkingtype"
                  value="uncovered"
                  checked={this.state.spot_type == "uncovered"}
                  onClick={this.handleChange("spot_type")}
                />
                <label htmlFor="uncovered">Uncovered</label>
  
                <input
                  type="radio"
                  id="california_canopy"
                  name="parkingtype"
                  value="california_canopy"
                  checked={this.state.spot_type == "california_canopy"}
                  onClick={this.handleChange("spot_type")}
                />
                <label htmlFor="california_canopy">California Canopy</label>

              </div>
  
              <div>
                <label> Term </label>
                <select onChange={this.handleChange("rental_type")}>
                  <option hidden value="">
                    --Select One--
                  </option>
                  <option value="daily" selected={this.state.rental_type == "daily"} >Daily</option>
                  <option value="weekly" selected={this.state.rental_type == "weekly"} >Weekly</option>
                  <option value="monthly" selected={this.state.rental_type == "monthly"} >Monthly</option>
                  <option value="yearly" selected={this.state.rental_type == "yearly"} >Yearly</option>
                </select>
              </div>
  
              <div>
                <label> Rate ($ per term) </label>
                <input type="number" onChange={this.handleChange("rental_rate")} value={this.state.rental_rate} />
              </div>
  
              <div>
                <label> Additional Information / Description: </label>
                <textarea onChange={this.handleChange("description")} value={this.state.description} />
              </div>
            </div>
  
            <input type="submit" onClick={(e) => this.handleSubmit(e)} value="Update Parking Spot" />
          </form>
        </div>
      );
    } else if (!this.state) {
      return (
        <div className="search-list-loading">
          <Image className="search-list-loading-gif" src={LOADING_GIF} />
          <span>One moment please...</span>
        </div>
      )
    }


    // console.log(this.state) // for testing purposes

  }
}

export default withRouter(EditSpot);
