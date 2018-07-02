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
      optional_msg: "",
      loading:true
    };


  }

  componentDidMount() {
    this.props.fetchSpot(this.props.spotId);
    this.props.fetchVehicles();
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

  handleDelete(e) {
    this.props.deleteSpot(this.props.spotId);
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
        .then((_) => this.setState({loading:false}))
        .catch(err => console.log(err));
    }
  }

  render() {

    debugger

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

      var renderMap = <MyMapComponent 
                        isMarkerShown 
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg" 
                        loadingElement={<div style={{ height: `100%` }} />} 
                        containerElement={<div className="myMapComponent" style={{ height: `250px`, width: `400px`, borderRadius: `15px` }} />} 
                        mapElement={<div style={{ height: `100%`, borderRadius: `15px` }} />} />;

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
      // debugger
      if (this.props.user.id === this.props.spot.seller_id) {

        var renderReservationInfo = (
          <div>
            <h3> Reservations </h3>
            <ReservationsContainer spotId={this.props.spotId} />

          </div>
        )

        var renderButtons = (
          <div className="info-buttons">
            {/* <Link to={`/spots/edit/${this.props.spot._id}`}>
              <input type="button" value="Edit Spot" id="show-spot-button"/>
            </Link> */}

            <input type="button" onClick={e => this.handleDelete(e)} value="Delete Spot" id="show-spot-button" />
          </div>
        )
      } else {

        var renderReservationInfo = (
            <div>

              <h3> Book a Reservation </h3>
              <h5>
                <label> Date: </label>
                <br />
                from{" "}
                <input
                  type="date"
                  onChange={e => this.handleChange(e, "from")}
                />
                <br />
                to{"    "}
                <input type="date" onChange={e => this.handleChange(e, "to")} />
              </h5>

              <h5>
                <label>Your Vehicle:</label>
                <br />
                <select onChange={e => this.handleChange(e, "vehicle")}>
                  <option hidden value="">
                    --Select One--
                      </option>

                  {this.props.vehicles.map((vehicle, i) => {
                    return (
                      <option key={i} value={vehicle._id}>
                        {vehicle.model}
                      </option>
                    );
                  })}
                </select>
              </h5>

              <h5>
                <label>Optional Message to Owner:</label>
                <textarea onChange={e => this.handleChange(e, "message")} />
              </h5>
            </div>

        );

        var renderSubmit = (
          <div className="button-container">
            <input
              type="submit"
              onClick={e => this.handleSubmit(e)}
              value="Request Parking"
              id="show-spot-button"
            />
          </div>
        )

        var renderButtons = (
          <div></div>
        )
      }

      return <div>
          <div className="backtosearch">
            <Link to={`/user/profile`}>
              <div>{"<< Back to User Profile Page"}</div>
            </Link>
          </div>

          <div className="ShowSpot">
            <div className="Image-Map">
              <div className="show-spot-main-img" style={imageStyle} />
              {renderMap}

              <div id="reservations-list" />
            </div>

            <div className="ShowSpot-Info">
              <div className="Spot-Info">
                <h3> Parking Spot Information </h3>
                <div className="spot-info-body">
                  <div className="info-body">
                    <h5>
                      Address: {this.props.spot.line1} {this.props.spot.line2} <br />
                      {this.props.spot.city} {this.props.spot.state}, {this.props.spot.zipcode}
                    </h5>
                    <h5>Type: {this.props.spot.spot_type}</h5>
                    <h5>
                      Allowed: {this.props.spot.vehicle_types.join(", ")}
                    </h5>
                    <h5>
                      Rate: ${this.props.spot.rental_rate} {this.props.spot.rental_type}
                    </h5>
                  </div>

                    {renderButtons}

                </div>

                <h5 id="showspot-description">
                  Description: {this.props.spot.description}
                </h5>
              </div>

              <div className="reservation-form">
                {renderReservationInfo}

                {renderSubmit}
              </div>
            </div>
          </div>
        </div>;
    }
  }
}
export default ShowSpot;
