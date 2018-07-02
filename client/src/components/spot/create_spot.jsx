import React from "react";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import { compose, withStateHandlers } from "recompose";
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
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: "",
      description: "",
      vehicle_types: [],
      spot_type: "",
      rental_rate: "",
      rental_type: "",
      img_url: null,
      latitude: "",
      longitude: "",
      files: null
    };

    this.lat = 37.798965;
    this.lng = -122.4013603;
    // App Academy Coordinates

    this.markerLat;
    this.markerLng;

    this.renderMapAfterTime = this.renderMapAfterTime.bind(this);
    this.geocode = this.geocode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setImg = this.setImg.bind(this);

    this.renderMap = true;

    this.timeout = undefined;
  }

  uploadFile() {
    var formData = new FormData(),
      file = this.state.files[0],
      xhr = new XMLHttpRequest(),
      cloudName = "clustermass";

    formData.append("file", file);
    formData.append("upload_preset", "pykxpoqv"); // REQUIRED
    xhr.open(
      "POST",
      "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload"
    );

    xhr.onload = () => {
      if (xhr.status === 200) {
        // Success! You probably want to save the URL somewhere
        var response = JSON.parse(xhr.response);
        this.setState({ img_url: response.secure_url }); // https address of uploaded file
      } else {
        alert("Image upload failed. Please try agian.");
      }
    };
    xhr.send(formData);
  }

  setImg(e) {
    this.setState({ files: e.target.files }, this.uploadFile);
  }

  handleSubmit(e) {
    e.preventDefault();

    let spot = {};
    spot.line1 = this.state.line1;
    spot.line2 = this.state.line2;
    spot.city = this.state.city;
    spot.state = this.state.state;
    spot.zipcode = this.state.zipcode;
    spot.description = this.state.description;
    spot.vehicle_types = this.state.vehicle_types;
    spot.spot_type = this.state.spot_type;
    spot.rental_rate = this.state.rental_rate;
    spot.rental_type = this.state.rental_type;
    if (this.state.img_url === null) {
      spot.img_url =
        "https://res.cloudinary.com/clustermass/image/upload/v1530477397/vafbxhikgkofcuewcvvs.png";
    } else {
      spot.img_url = this.state.img_url;
    }
    spot.latitude = this.state.latitude;
    spot.longitude = this.state.longitude;
    this.props
      .createSpot(spot)
      .then(res =>
        this.props.history.push(`/spots/${res.spot.data.spots[0]._id}`)
      )
      .catch(err => console.log(err));

    // debugger
    this.setState({
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: "",
      description: "",
      vehicle_types: [],
      spot_type: "",
      rental_rate: "",
      rental_type: "",
      img_url: "",
      latitude: "",
      longitude: "",
      files: null
    });
  }

  handleAddressChange(val) {
    //
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
      if (val === "vehicle_type") {
        if (this.state.vehicle_types.includes(e.currentTarget.value)) {
          let arr = this.state.vehicle_types;
          let index = arr.indexOf(e.currentTarget.value);

          arr.splice(index, 1);
        } else {
          this.state.vehicle_types.push(e.currentTarget.value);
        }
      } else if (val === "spot_type") {
        this.state.spot_type = e.currentTarget.value;
      } else if (val === "gated?") {
        this.state.gated = this.state.gated === "no" ? "yes" : "no";
      } else if (val === "rental_type") {
        this.state.rental_type = e.currentTarget.value;
      } else if (val === "rental_rate") {
        this.state.rental_rate = e.currentTarget.value;
      } else if (val === "description") {
        this.state.description = e.currentTarget.value;
      }

      console.log(this.state);
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

      .then(res => {
        this.lat = res.results[0].geometry.location.lat;
        this.lng = res.results[0].geometry.location.lng;

        this.state.latitude = this.lat;
        this.state.longitude = this.lng;
      })
      .catch(err => console.log("Please enter Address"));
  }

  render() {
    this.geocode();

    let renderMap;

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
              style={{
                height: `400px`,
                width: `600px`,
                margin: `0px auto 0px auto`,
                borderRadius: `0px 0px 15px 15px`,
                boxShadow: `0px 3px 3px rgba(0, 0, 0, 0.5)`
              }}
            />
          }
          mapElement={
            <div
              style={{ height: `100%`, borderRadius: `0px 0px 15px 15px` }}
            />
          }
        />
      );
    } else {
      renderMap = (
        <h3
          className="noMapComponent"
          style={{
            height: `400px`,
            width: `600px`,
            margin: `0px auto 0px auto`,
            borderRadius: `0px 0px 15px 15px`,
            border: `1px solid black`,
            boxShadow: `0px 3px 3px rgba(0, 0, 0, 0.5)`
          }}
        />
      );
    }

    let imageStyle;
    if (this.state.main_picture_url != "") {
      imageStyle = {
        backgroundImage: `url('${this.state.img_url}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
      };
    }
    return (
      <div className="create-spot-page">
        <div className="create-spot-form">
          <h2> Create a new Parking Spot </h2>

          <form>
            {this.state.img_url === null ? (
              <div id="upload-image">
                <span>Please upload a parking photo:</span>
                <br />
                <input type="file" onChange={e => this.setImg(e)} />
              </div>
            ) : (
              <div className="create-spot-main-img" style={imageStyle} />
            )}

            <div className="Address">
              <label> Address: </label>
              <div id="building-street">
                <input
                  type="text"
                  placeholder="Number"
                  onChange={this.handleAddressChange("line1")}
                />

                <input
                  type="text"
                  placeholder="Street"
                  onChange={this.handleAddressChange("line2")}
                />
              </div>
              <div id="city-state-zip">
                <input
                  type="text"
                  placeholder="City/Town"
                  onChange={this.handleAddressChange("city")}
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

            <div className="create-spot-info">
              <div className="vehicle-types">
                <label id="spot-info-title"> Vehicle Types Allowed </label>{" "}
                <br />
                <input
                  type="checkbox"
                  id="motorcycle"
                  onClick={this.handleChange("vehicle_type")}
                  name="vehicletype"
                  value="motorcycle"
                />
                <label htmlFor="motorcycle">Motorcycle</label>
                <input
                  type="checkbox"
                  id="car"
                  onClick={this.handleChange("vehicle_type")}
                  name="vehicletype"
                  value="car"
                />
                <label htmlFor="car">Car</label>
                <input
                  type="checkbox"
                  id="full_size"
                  onClick={this.handleChange("vehicle_type")}
                  name="vehicletype"
                  value="full_size"
                />
                <label htmlFor="full_size">Full size</label>
                <input
                  type="checkbox"
                  id="compact"
                  onClick={this.handleChange("vehicle_type")}
                  name="vehicletype"
                  value="compact"
                />
                <label htmlFor="compact">Compact</label>
                <input
                  type="checkbox"
                  id="truck"
                  onClick={this.handleChange("vehicle_type")}
                  name="vehicletype"
                  value="truck"
                />
                <label htmlFor="truck">Truck</label>
                <input
                  type="checkbox"
                  id="other"
                  onClick={this.handleChange("vehicle_type")}
                  name="vehicletype"
                  value="other"
                />
                <label htmlFor="other">Other</label>
              </div>

              <div className="spot-type">
                <label id="spot-info-title"> Type of Parking </label> <br />
                <input
                  type="radio"
                  id="garage"
                  onChange={this.handleChange("spot_type")}
                  name="parkingtype"
                  value="garage"
                />
                <label htmlFor="garage">Garage</label>
                <input
                  type="radio"
                  id="openparking"
                  onChange={this.handleChange("spot_type")}
                  name="parkingtype"
                  value="openparking"
                />
                <label htmlFor="openparking">Open Parking</label>
                <input
                  type="radio"
                  id="underground"
                  onChange={this.handleChange("spot_type")}
                  name="parkingtype"
                  value="underground"
                />
                <label htmlFor="underground">Underground</label>
                <input
                  type="radio"
                  id="solar"
                  onChange={this.handleChange("spot_type")}
                  name="parkingtype"
                  value="solar"
                />
                <label htmlFor="solar">Solar Carport</label>
              </div>

              <div className="rental-type">
                <label id="spot-info-title"> Term </label>
                <select onChange={this.handleChange("rental_type")}>
                  <option hidden value="">
                    --Select One--
                  </option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <div className="rental-rate">
                  <label id="spot-info-title-2"> Rate ($ per term) </label>
                  <input
                    onChange={this.handleChange("rental_rate")}
                    type="number"
                  />
                </div>
              </div>

              <div className="description">
                <label id="spot-info-title">
                  {" "}
                  Additional Information / Description:{" "}
                </label>
                <textarea onChange={this.handleChange("description")} />
              </div>

              <input
                id="submit-button"
                type="submit"
                onClick={e => this.handleSubmit(e)}
                value="Create Parking Spot"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateSpot);
