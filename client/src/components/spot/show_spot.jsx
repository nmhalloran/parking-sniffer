import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import Image from "react-image";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { LOADING_GIF } from "../../img/index";
import "./show_spot.css";
import ReservationsContainer from "./reservations_container";

class ShowSpot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: "",
      end_date: "",
      booking_status: "pending",
      vehicle_id: "",
      spot_id: this.props.spotId,
      parker_id: this.props.user.id,
      seller_id: "",
      optional_msg: ""
    };


  }

  componentWillMount() {
    //requesting spot from backend...
    this.props.fetchSpot(this.props.spotId);
  }
  componentWillUnmount() {
    //Erasing any errors...
    this.props.clearErrors();
  }


  handleChange(e, val) {
    switch (val) {
      case "from":
        this.state.start_date = e.currentTarget.value;
        break;

      case "to":
        this.state.end_date = e.currentTarget.value;
        break;

      case "vehicle":
        this.state.vehicle_id = e.currentTarget.value;
        break;

      case "message":
        this.state.optional_msg = e.currentTarget.value;
        break;

      default:
        break;
    }
  }

  handleSubmit(e) {
    this.state.seller_id = this.props.spot.seller_id;
    if (
      this.state.start_date === "" ||
      this.state.end_date === "" ||
      this.state.vehicle_id === ""
    ) {
      alert("please fill in required inputs");
    } else {
      this.props
        .createReservation(this.props.spotId, this.state)
        .then((_) => this.props.fetchSpot(this.props.spotId))
        .catch(err => console.log(err));
    }
  }

  render() {
    if (!this.props.spot && this.props.errors.length > 0) {
      //No spot available and some error occured...
      return (
        <div className="search-list-loading">
          <span>Sorry, error occured.</span>
        </div>
      );
    } else if (!this.props.spot) {
      //Waiting for backend to send back our spot...
      return (
        <div className="search-list-loading">
          <Image className="search-list-loading-gif" src={LOADING_GIF} />
          <span>One moment please...</span>
        </div>
      );
    } else {
      var MyMapComponent = withScriptjs(
        withGoogleMap(props => {
          return (
            <GoogleMap
              defaultZoom={17}
              defaultCenter={{
                lat: this.props.spot.geometry.coordinates[1],
                lng: this.props.spot.geometry.coordinates[0]
              }}
            >
              {props.isMarkerShown && (
                <Marker
                  position={{
                    lat: this.props.spot.geometry.coordinates[1],
                    lng: this.props.spot.geometry.coordinates[0]
                  }}
                />
              )}
            </GoogleMap>
          );
        })
      );

      var renderMap = (
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div
              className="myMapComponent"
              style={{ height: `362.5px`, width: `600px`, margin: `25px` }}
            />
          }
          mapElement={<div style={{ height: `100%` }} />}
        />
      );

      // console.log(this.state.latitude)
      // console.log(this.state.longitude)
      let imageStyle;

      if (this.props.spot.img_url != null) {
        imageStyle = {
          backgroundImage: `url('${this.props.spot.img_url}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        };
      }

      return (
        <div>
          <div className="backtosearch">
            <div>{"<<Back to Search"}</div>
          </div>

          <div className="ShowSpot">
            <div className="Image-Map">
              <div className="show-spot-main-img" style={imageStyle} />
              {renderMap}
            </div>

            <div className="ShowSpot-Info">
              <h3>{this.props.spot.spot_type}</h3>
              <h5>Allowed: {this.props.spot.vehicle_types.join(", ")}</h5>
              <h5>
                Rate: ${this.props.spot.rental_rate}{" "}
                {this.props.spot.rental_type}
              </h5>
              <h5>
                Address: {this.props.spot.line1} {this.props.spot.line2} <br />
                {this.props.spot.city} {this.props.spot.state},{" "}
                {this.props.spot.zipcode}
              </h5>
              <h5 id="showspot-description">{this.props.spot.description}</h5>

              <h5>
                <label> Date: </label>
                <br />
                from{" "}
                <input
                  type="date"
                  onChange={e => this.handleChange(e, "from")}
                />
                <br />
                to{" "}
                <input type="date" onChange={e => this.handleChange(e, "to")} />
              </h5>

              <h5>
                <label>Your Vehicle:</label>
                <br />
                <select onChange={e => this.handleChange(e, "vehicle")}>
                  <option hidden value="">
                    --Select One--
                  </option>

                  {this.props.user.vehicles.map((vehicle, i) => {
                    return (
                      <option key={i} value={vehicle._id}>
                        {" "}
                        {vehicle._id}{" "}
                      </option>
                    );
                  })}
                </select>
              </h5>

              <h5>
                <label>Optional Message to Parking Spot Owner:</label>
                <textarea onChange={e => this.handleChange(e, "message")} />
              </h5>

              <input
                type="submit"
                onClick={e => this.handleSubmit(e)}
                value="Request Parking Spot"
              />
            </div>
          </div>
          <ReservationsContainer spotId={this.props.spotId}/>
          {/* <div>Hello {this.currentUser.name}</div> */}
        </div>
      );
    }
  }
}
export default ShowSpot;
