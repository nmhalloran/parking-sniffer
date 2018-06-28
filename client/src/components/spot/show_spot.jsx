import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

import "./show_spot.css";

class ShowSpot extends React.Component {

    componentDidMount() {
        this.props.fetchSpot(this.props.match.params.id);
    }

    constructor(props) {
        super(props);

        this.currentUser = props.user;
        this.state = props.spot;

        // App Academy Coordinates
        
    }


    render() {

        var MyMapComponent = withScriptjs(withGoogleMap((props) => {

            return <GoogleMap defaultZoom={18} defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}>
                {props.isMarkerShown && <Marker position={{ lat: this.state.latitude, lng: this.state.longitude }} />}
              </GoogleMap>;
        }))

        var renderMap = <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className="myMapComponent" style={{ height: `362.5px`, width: `600px`, margin: `25px` }} />}
            mapElement={<div style={{ height: `100%` }} />} />

        console.log(this.state.latitude)
        console.log(this.state.longitude)

        return <div>
            <div className="backtosearch">
              <div>{"<<Back to Search"}</div>
            </div>

            <div className="ShowSpot">
              <div className="Image-Map">
                <div id="showspot-image" />
                {/* <div id="showspot-map" /> */}
                {renderMap}
              </div>

              <div className="ShowSpot-Info">
                <h3>{this.state.spot_type}</h3>
                <h5>Allowed: {this.state.vehicle_types.join(", ")}</h5>
                <h5>
                  Rate: ${this.state.rental_rate} {this.state.rental_type}
                </h5>
                <h5>
                  Address: {this.state.line1} {this.state.line2} <br />
                  {this.state.city} {this.state.state}, {this.state.zipcode}
                </h5>
                <h5 id="showspot-description">
                  {this.state.description}
                </h5>

                <h5>
                  <label> Date: </label>
                  <br />
                  from <input type="date" />
                  <br />
                  to <input type="date" />
                </h5>

                <h5>
                  <label>Your Vehicle:</label>
                  <br />
                  <select>
                    <option hidden value="">
                      --Select One--
                    </option>
                    {this.state.vehicle_types.map((vehicle, i) => {
                      return <option key={i} value={vehicle}>
                          {" "}
                          {vehicle}{" "}
                        </option>;
                    })}
                  </select>
                </h5>

                <h5>
                  <label>Optional Message to Parking Spot Owner:</label>
                  <textarea />
                </h5>

                <input type="submit" value="Request Parking Spot" />
              </div>
            </div>

            {/* <div>Hello {this.currentUser.name}</div> */}
          </div>;
    }

}

export default ShowSpot;