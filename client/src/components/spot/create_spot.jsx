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

import "./create_spot.css";



class CreateSpot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            line1: '',
            line2: '',
            city: '',
            state: '',
            zipcode: '',
            description: '',
            vehicle_types: [],
            spot_type: '',
            rental_rate: '',
            rental_type: '',
            img_url: null,
            latitude: '',
            longitude: '',
            files: null,
        }


        this.lat = 37.798965;
        this.lng = -122.4013603;
        // App Academy Coordinates

        this.markerLat;
        this.markerLng;

        this.renderMapAfterTime = this.renderMapAfterTime.bind(this);
        this.geocode = this.geocode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setImg = this.setImg.bind(this)

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
      xhr.open("POST", "https://api.cloudinary.com/v1_1/" +
        cloudName +
        "/image/upload");

      xhr.onload = () => {
        if (xhr.status === 200) {
          // Success! You probably want to save the URL somewhere
          var response = JSON.parse(xhr.response);
          this.setState({img_url:response.secure_url}) // https address of uploaded file
        } else {
          alert("Image upload failed. Please try agian.");
        }
      }
      xhr.send(formData);
    }

    setImg(e){
      this.setState({files: e.target.files},this.uploadFile)
    }

    handleSubmit(e) {
        e.preventDefault();

        let spot = {}
        spot.line1 = this.state.line1
        spot.line2 = this.state.line2
        spot.city = this.state.city
        spot.state = this.state.state
        spot.zipcode = this.state.zipcode
        spot.description = this.state.description
        spot.vehicle_types = this.state.vehicle_types
        spot.spot_type = this.state.spot_type
        spot.rental_rate = this.state.rental_rate
        spot.rental_type = this.state.rental_type
        spot.img_url = this.state.img_url
        spot.latitude = this.state.latitude
        spot.longitude = this.state.longitude
        
        console.log(this.state);
        this.props.createSpot(spot);
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
          files:null,
        });
    }

    handleAddressChange(val) {
        //
        this.renderMap = false;


        return (e) => {
            if (this.timeout) { clearTimeout(this.timeout) }
            this.setState({ [val]: e.currentTarget.value });

            this.timeout = setTimeout(this.renderMapAfterTime, 1500);

        }
    }

    handleChange(val) {
        return (e) => {
            
            if (val === 'vehicle_type') {
   
                if (this.state.vehicle_types.includes(e.currentTarget.value)) {

                    let arr = this.state.vehicle_types
                    let index = arr.indexOf(e.currentTarget.value);

                    arr.splice(index, 1)

                } else {
                    this.state.vehicle_types.push(e.currentTarget.value);
                }
            } else if (val === 'spot_type') {
                this.state.spot_type = e.currentTarget.value
            } else if (val === 'gated?') {
                this.state.gated = this.state.gated === 'no' ? 'yes' : 'no' ;
            } else if (val === 'rental_type') {
                this.state.rental_type = e.currentTarget.value;
            } else if (val === 'rental_rate') {
                this.state.rental_rate = e.currentTarget.value;
            } else if (val === 'description') {
                this.state.description = e.currentTarget.value;
            }

            console.log(this.state)
        }
    }

    renderMapAfterTime() {
        this.renderMap = true;
        this.forceUpdate();

    }

    geocode() {
        // var location = '825 battery st. sf, ca';
        // let axiosRequest = axios.create();
        // axiosRequest.defaults.headers.common['Content-Type'] = 'application/json';
        // delete axiosRequest.defaults.headers.common['Authorization'];
        //
        var location = `${this.state.line1} + ${this.state.line2} + ${this.state.city} + ${this.state.state} + ${this.state.zipcode}`;
        $.ajax({
            method: 'GET',
            url: "https://maps.googleapis.com/maps/api/geocode/json",
            data: {
                address: location,
                key: 'AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg'
            }
        })
        // axiosRequest.get("https://maps.googleapis.com/maps/api/geocode/json", {
        //   params: {
        //     address: location,
        //     key: 'AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg'
        //   }
        // })
        .then(res => {
            // console.log(res)
            //
            this.lat = res.results[0].geometry.location.lat;
            this.lng = res.results[0].geometry.location.lng;

            this.state.latitude = this.lat;
            this.state.longitude = this.lng;

        })
        .catch(err => console.log("Please enter Address"))
    }

    render() {
        this.geocode();

        let renderMap;

        if (this.state.line1.length > 0 && this.state.city.length > 0 &&
            this.state.state.length >= 2 && this.state.zipcode.toString().length >= 5 && this.renderMap) {

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
                style={{ height: `400px`, width: `800px` }}
              >
              </h3>;
        }

        // console.log(this.state) // for testing purposes


        let imageStyle
        if (this.state.main_picture_url != ''){
          imageStyle = {
            backgroundImage: `url('${this.state.img_url}')`,
            backgroundRepeat  : 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
      };
  }
        return <div>
            <h4> Create a new Parking Spot </h4>

            <form>
              {this.state.img_url === null ? (
                <div style={{fontSize:'20px',color:'#737373'}}>
                  <span>Please, select parking photo</span>
                  <input type="file" onChange={ (e) => this.setImg(e) } />
                </div>
              ) : (
                <div className="create-spot-main-img" style={imageStyle}>
                </div>
              )}


              <div className="Address">
                <label> Address: </label>
                <div id="building-street">
                  <input 
                  type="text" 
                  placeholder="Building" 
                  onChange={this.handleAddressChange("line1")} />

                  <input type="text" 
                  placeholder="Street" 
                  onChange={this.handleAddressChange("line2")} />

                </div>
                <div id="city-state-zip">
                  <input type="text" placeholder="City/Town" onChange={this.handleAddressChange("city")} />
                  <input type="text" placeholder="State" onChange={this.handleAddressChange("state")} value={this.state.state} />
                  <input type="number" placeholder="Zip Code" onChange={this.handleAddressChange("zipcode")} value={this.state.zipcode} />
                </div>
              </div>

              {renderMap}

              <div>
                <label> Vehicle Types Allowed </label>
                <input type="checkbox" id="motorcycle" onClick={this.handleChange("vehicle_type")} name="vehicletype" value="motorcycle" />
                <label htmlFor="motorcycle">Motorcycle</label>

                <input type="checkbox" id="compact" onClick={this.handleChange("vehicle_type")} name="vehicletype" value="compact" />
                <label htmlFor="compact">Compact</label>

                <input type="checkbox" id="sedan" onClick={this.handleChange("vehicle_type")} name="vehicletype" value="sedan" />
                <label htmlFor="fullsize">Sedan</label>

                <input type="checkbox" id="truck" onClick={this.handleChange("vehicle_type")} name="vehicletype" value="truck" />
                <label htmlFor="truck">Truck</label>
              </div>

              <div>
                <label> Type of Parking </label>
                <input type="radio" id="covered" onChange={this.handleChange("spot_type")} name="parkingtype" value="covered" />
                <label htmlFor="covered">Covered</label>

                <input type="radio" id="uncovered" onChange={this.handleChange("spot_type")} name="parkingtype" value="uncovered" />
                <label htmlFor="uncovered">Uncovered</label>

                <input type="radio" id="california_canopy" onChange={this.handleChange('spot_type')} name="parkingtype" value="california_canopy" />
                <label htmlFor="california_canopy">
                  California Canopy
                </label>

              </div>

              <div>
                <label> Term </label>
                <select onChange={this.handleChange("rental_type")}>
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
                <input onChange={this.handleChange("rental_rate")} type="number" />
              </div>

              <div>
                <label> Additional Information / Description: </label>
                <textarea onChange={this.handleChange("description")} />
              </div>

              <input type="submit" onClick={ (e) => this.handleSubmit(e) } value="Create Parking Spot" />
            </form>
          </div>;

    }
};

export default withRouter(CreateSpot);
