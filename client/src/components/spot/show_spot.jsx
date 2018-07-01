import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import Image from 'react-image'
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
import { LOADING_GIF } from '../../img/index';
import "./show_spot.css";

class ShowSpot extends React.Component {
    constructor(props) {
        super(props);

        // this.currentUser = props.user;
        // this.state = props.spot;

        // App Academy Coordinates

        // this.state = {
        //   spotId = props.spotId
        // }
}

componentDidMount() {
  //requesting spot from backend...
      this.props.fetchSpotById(this.props.spotId);
}
componentWillUnmount(){
//Erasing any errors...
this.props.clearErrors()

}

render() {

    if(!this.props.spot && this.props.errors.length > 0){
      //No spot available and some error occured...
      return(<div className="search-list-loading">

              <span>Sorry, error occured.</span>
              </div>)
    }else if(!this.props.spot){
        //Waiting for backend to send back our spot...
      return(<div className="search-list-loading">
              <Image className="search-list-loading-gif" src={ LOADING_GIF } />
              <span>One moment please...</span>
              </div>)

    }else{


    var MyMapComponent = withScriptjs(withGoogleMap((props) => {

        return <GoogleMap defaultZoom={18} defaultCenter={{ lat: this.props.spot.latitude, lng: this.props.spot.longitude }}>
            {props.isMarkerShown && <Marker position={{ lat: this.props.spot.latitude, lng: this.props.spot.longitude }} />}
          </GoogleMap>;
    }))

    var renderMap = <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div className="myMapComponent" style={{ height: `362.5px`, width: `600px`, margin: `25px` }} />}
        mapElement={<div style={{ height: `100%` }} />} />

    // console.log(this.state.latitude)
    // console.log(this.state.longitude)

    return (<div>
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
            <h3>{this.props.spot.spot_type}</h3>
            <h5>Allowed: {this.props.spot.vehicle_types.join(", ")}</h5>
            <h5>
              Rate: ${this.props.spot.rental_rate} {this.props.spot.rental_type}
            </h5>
            <h5>
              Address: {this.props.spot.line1} {this.props.spot.line2} <br />
            {this.props.spot.city} {this.props.spot.state}, {this.props.spot.zipcode}
            </h5>
            <h5 id="showspot-description">
              {this.props.spot.description}
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
                {this.props.spot.vehicle_types.map((vehicle, i) => {
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
      </div>)

}

}
}
export default ShowSpot;
