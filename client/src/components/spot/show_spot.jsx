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
        this.props.fetchSpotsByOwner();
        this.props.fetchSpot(this.props.match.params.id);
        // console.log(this.props)
    }
      
      constructor(props) {
        super(props);
        
        this.currentUser = props.user;
        this.currentSpot = Object.assign({}, props.spot);       
        this.state = {  start_date: '',
                        end_date: '',
                        booking_status: 'pending',
                        vehicle_id: '',
                        spot_id: this.currentSpot._id,
                        parker_id: this.currentUser.id,
                        seller_id: this.currentSpot.owner_id,
                        optional_msg: ''
                    }; 
    }

    handleChange (e,val) {
      switch (val) {
        case 'from':
          this.state.start_date = e.currentTarget.value;
          break;

        case 'to':
          this.state.end_date = e.currentTarget.value;
          console.log(this.state)
          break;

        case 'vehicle':
          this.state.vehicle_id = e.currentTarget.value;
          break;

        case 'message':
          this.state.optional_msg = e.currentTarget.value;
          break;
      
        default:
          break;
      }
    }

    render() {
        var MyMapComponent = withScriptjs(withGoogleMap((props) => {

            return <GoogleMap defaultZoom={18} defaultCenter={{ lat: this.currentSpot.geometry.coordinates[0], lng: this.currentSpot.geometry.coordinates[1] }}>
                {props.isMarkerShown && <Marker position={{ lat: this.currentSpot.geometry.coordinates[0], lng: this.currentSpot.geometry.coordinates[1] }} />}
              </GoogleMap>;
        }))

        var renderMap = <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className="myMapComponent" style={{ height: `362.5px`, width: `600px`, margin: `25px` }} />}
            mapElement={<div style={{ height: `100%` }} />} />


        return <div>
            <div className="backtosearch">
              <div>{"<<Back to Search"}</div>
            </div>

            <div className="ShowSpot">
              <div className="Image-Map">
                <div id="showspot-image" />
          
                {renderMap}

              </div>

              <div className="ShowSpot-Info">
                <h3>{this.currentSpot.spot_type}</h3>
                <h5>Allowed: {this.currentSpot.vehicle_types.join(", ")}</h5>
                <h5>
                  Rate: ${this.currentSpot.rental_rate} {this.currentSpot.rental_type}
                </h5>
                <h5>
                  Address: {this.currentSpot.line1} {this.currentSpot.line2} <br />
                  {this.currentSpot.city} {this.currentSpot.currentSpot}, {this.currentSpot.zipcode}
                </h5>
                <h5 id="showspot-description">
                  {this.currentSpot.description}
                </h5>

                <h5>
                  <label> Date: </label>
                  <br />
                  from <input type="date" onChange={ e => this.handleChange(e, "from") } />
                  <br />
                  to <input type="date" onChange={ e => this.handleChange(e, "to") } />
                </h5>

                <h5>
                  <label>Your Vehicle:</label>
                  <br />
                  <select onChange={ e => this.handleChange(e, 'vehicle') } >
                    <option hidden value="">
                      --Select One--
                    </option>
                    {this.currentSpot.vehicle_types.map((vehicle, i) => {
                      return <option key={i} value={vehicle}>
                          {vehicle}
                        </option>;
                    })}
                  </select>
                </h5>

                <h5>
                  <label>Optional Message to Parking Spot Owner:</label>
                  <textarea onChange={e => this.handleChange(e, 'message') } />
                </h5>

                <input type="submit" value="Request Parking Spot" />
              </div>
            </div>

           
          </div>;
    }

}

export default withRouter(ShowSpot);