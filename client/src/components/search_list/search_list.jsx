import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Image from "react-image";
import { ARROW_DOWN, ARROW_UP, LOADING_GIF } from "../../img/index";
import SpotIndexItem from "./spot_index_item";
import GoogleMapReact from 'google-map-react';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class SearchList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchDivVisible: "search-list-filters-off",
      garage: true,
      openParking: true,
      underground: true,
      solar: true,

      daily: true,
      weekly: true,
      monthly: true,
      yearly: true,
      motorcycle: true,
      truck: true,
      car: true,
      fullSize: true,
      compact: true,
      other: true,

      lat: "",
      long: "",
      pos: 0,
      range: this.props.range,
      zip: this.props.zip,
      spots: [],
      allSpots: [],
      listingsQuantity: this.props.listingsQuantity
    };

    //If this.props.entities.spots.indexloading === true, no response from server was received.

    this.toggleSearchDiv = this.toggleSearchDiv.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleField = this.handleField.bind(this);
    this.receiveSpotsDelayed = this.receiveSpotsDelayed.bind(this);
    this.filterSpots = this.filterSpots.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  receiveSpotsDelayed() {
    if (
      this.state.range.toString() != "" &&
      this.state.zip.toString().length === 5
    ) {
      this.props.fetchSpotsByZip({
        zip: this.state.zip,
        range: this.state.range
      });
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.setState({ pos: pos });
        this.props.fetchSpotsByGPS({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          range: this.state.range
        });
      },
      () => {
        this.props.fetchSpotsByZip({
          zip: this.state.zip,
          range: this.state.range
        });
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.zip != this.state.zip) {
      this.setState({ zip: nextProps.zip });
    }
    let allSpots = Object.assign({}, nextProps.spots);
    let zip = allSpots.zip;
    let range = allSpots.range;
    delete allSpots.zip;
    delete allSpots.range;

    allSpots = Object.values(allSpots);

    let spots = this.filterSpots(allSpots);
    this.setState({ spots: spots, allSpots: allSpots });
  }

  filterSpots(spots_arr) {
    let all_spots_arr = spots_arr.slice();

    let filteredByTypeSpots = [];

    if (this.state.garage) {
      let filtered_spots_arr = all_spots_arr.filter(
        spot => spot.spot_type === "garage"
      );
      filteredByTypeSpots = filteredByTypeSpots.concat(filtered_spots_arr);
    }
    if (this.state.openParking) {
      let filtered_spots_arr = all_spots_arr.filter(
        spot => spot.spot_type === "openparking"
      );
      filteredByTypeSpots = filteredByTypeSpots.concat(filtered_spots_arr);
    }
    if (this.state.underground) {
      let filtered_spots_arr = all_spots_arr.filter(
        spot => spot.spot_type === "underground"
      );
      filteredByTypeSpots = filteredByTypeSpots.concat(filtered_spots_arr);
    }
    if (this.state.solar) {
      let filtered_spots_arr = all_spots_arr.filter(
        spot => spot.spot_type === "solar"
      );
      filteredByTypeSpots = filteredByTypeSpots.concat(filtered_spots_arr);
    }

    let filteredByTermSpots = [];

    if (this.state.daily) {
      let filtered_spots_arr = filteredByTypeSpots.filter(
        spot => spot.rental_type === "daily"
      );
      filteredByTermSpots = filteredByTermSpots.concat(filtered_spots_arr);
    }

    if (this.state.weekly) {
      let filtered_spots_arr = filteredByTypeSpots.filter(
        spot => spot.rental_type === "weekly"
      );
      filteredByTermSpots = filteredByTermSpots.concat(filtered_spots_arr);
    }
    if (this.state.monthly) {
      let filtered_spots_arr = filteredByTypeSpots.filter(
        spot => spot.rental_type === "monthly"
      );
      filteredByTermSpots = filteredByTermSpots.concat(filtered_spots_arr);
    }
    if (this.state.yearly) {
      let filtered_spots_arr = filteredByTypeSpots.filter(
        spot => spot.rental_type === "yearly"
      );
      filteredByTermSpots = filteredByTermSpots.concat(filtered_spots_arr);
    }

    let filteredByVehicleSpots = [];

    if (this.state.motorcycle) {
      let filtered_spots_arr = filteredByTermSpots.filter(spot =>
        spot.vehicle_types.includes("motorcycle")
      );
      filtered_spots_arr.forEach(spot => {
        if (!filteredByVehicleSpots.includes(spot)) {
          filteredByVehicleSpots.push(spot);
        }
      });
    }

    if (this.state.truck) {
      let filtered_spots_arr = filteredByTermSpots.filter(spot =>
        spot.vehicle_types.includes("truck")
      );
      filtered_spots_arr.forEach(spot => {
        if (!filteredByVehicleSpots.includes(spot)) {
          filteredByVehicleSpots.push(spot);
        }
      });
    }

    if (this.state.car) {
      let filtered_spots_arr = filteredByTermSpots.filter(spot =>
        spot.vehicle_types.includes("car")
      );
      filtered_spots_arr.forEach(spot => {
        if (!filteredByVehicleSpots.includes(spot)) {
          filteredByVehicleSpots.push(spot);
        }
      });
    }
    if (this.state.fullSize) {
      let filtered_spots_arr = filteredByTermSpots.filter(spot =>
        spot.vehicle_types.includes("full_size")
      );
      filtered_spots_arr.forEach(spot => {
        if (!filteredByVehicleSpots.includes(spot)) {
          filteredByVehicleSpots.push(spot);
        }
      });
    }
    if (this.state.compact) {
      let filtered_spots_arr = filteredByTermSpots.filter(spot =>
        spot.vehicle_types.includes("compact")
      );
      filtered_spots_arr.forEach(spot => {
        if (!filteredByVehicleSpots.includes(spot)) {
          filteredByVehicleSpots.push(spot);
        }
      });
    }
    if (this.state.other) {
      let filtered_spots_arr = filteredByTermSpots.filter(spot =>
        spot.vehicle_types.includes("other")
      );
      filtered_spots_arr.forEach(spot => {
        if (!filteredByVehicleSpots.includes(spot)) {
          filteredByVehicleSpots.push(spot);
        }
      });
    }
    return filteredByVehicleSpots;
  }

  toggleSearchDiv() {
    if (this.state.searchDivVisible === "search-list-filters-off") {
      this.setState({ searchDivVisible: "search-list-filters-on" });
    } else {
      this.setState({ searchDivVisible: "search-list-filters-off" });
    }
  }

  handleField(e, field) {
    this.setState({ [field]: e.target.value });
    if (field === "range" || field === "zip") {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(this.receiveSpotsDelayed, 500);
    }
  }

  handleCheckBox(e) {
    if (this.state[e]) {
      if (e === "car") {
        this.setState(
          {
            fullSize: false,
            compact: false,
            [e]: false
          },
          () => {
            let spots = this.filterSpots(this.state.allSpots);
            this.setState({ spots: spots });
          }
        );
      } else {
        this.setState({ [e]: false }, () => {
          let spots = this.filterSpots(this.state.allSpots);
          this.setState({ spots: spots });
        });
      }
    } else {
      if (e === "car") {
        this.setState(
          {
            fullSize: true,
            compact: true,
            [e]: true
          },
          () => {
            let spots = this.filterSpots(this.state.allSpots);
            this.setState({ spots: spots });
          }
        );
      } else if (e != "compact" && e != "fullSize") {
        this.setState({ [e]: true }, () => {
          let spots = this.filterSpots(this.state.allSpots);
          this.setState({ spots: spots });
        });
      } else {
        if (this.state.car) {
          this.setState({ [e]: true }, () => {
            let spots = this.filterSpots(this.state.allSpots);
            this.setState({ spots: spots });
          });
        }
      }
    }
  }

  loadMore() {
    let tempQuantity = this.state.listingsQuantity;
    tempQuantity = tempQuantity + 10;
    this.setState({ listingsQuantity: tempQuantity });
  }

  render() {
    let listingsOnMain = [];
    for (let i = 0; i < this.state.listingsQuantity; i++) {
      if (this.state.spots[i] !== undefined) {
        listingsOnMain.push(this.state.spots[i]);
      }
    }

    let noSearchResults = false;
    if (listingsOnMain.length === 0) {
      noSearchResults = true;
    }

    console.log(this.state);
    let bgstyle = {backgroundColor: '#F4F7F6'}
    return (
      <div style={bgstyle}>

        <div className="search-list-zip">
          <div>
            <span>Search parking in range of </span>
            <input
              onChange={e => this.handleField(e, "range")}
              value={this.state.range}
              type="text"
              style={{ width: "40px" }}
            />
            <span>miles</span>
          </div>
          <div>
            <span>around</span>
            <input
              onChange={e => this.handleField(e, "zip")}
              value={this.state.zip}
              type="text"
              style={{ width: "60px" }}
            />
          </div>
        </div>

        <div className={this.state.searchDivVisible}>


          <div className="search-list-checkbox-row">
            <div className="search-list-checkbox">
              <span>Type</span>
            </div>
            <div className="search-list-checkbox">
              <span>Term</span>
            </div>
            <div className="search-list-checkbox">
              <span>Vehicle</span>
            </div>
          </div>

          <div className="search-list-checkbox-row">
            <div className="search-list-checkbox">
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("garage")}
                checked={!!this.state.garage}
              />
              <span>Garage</span>
            </div>
            <div className="search-list-checkbox">
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("daily")}
                checked={!!this.state.daily}
              />
              <span>Daily</span>
            </div>
            <div className="search-list-checkbox">
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("motorcycle")}
                checked={!!this.state.motorcycle}
              />
              <span>Motorcycle</span>
            </div>
          </div>

          <div className="search-list-checkbox-row">
            <div className="search-list-checkbox">
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("openParking")}
                checked={!!this.state.openParking}
              />
              <span>Open parking</span>
            </div>
            <div className="search-list-checkbox">
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("weekly")}
                checked={!!this.state.weekly}
              />
              <span>Weekly</span>
            </div>
            <div className="search-list-checkbox">
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("car")}
                checked={!!this.state.car}
              />
              <span>Car</span>
            </div>
            <div
              className="search-list-checkbox"
              style={{ marginLeft: "15px" }}
            >
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("fullSize")}
                checked={!!this.state.fullSize}
              />
              <span>Full size</span>
            </div>
            <div
              className="search-list-checkbox"
              style={{ marginLeft: "15px" }}
            >
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("compact")}
                checked={!!this.state.compact}
              />
              <span>Compact</span>
            </div>
          </div>

          <div className="search-list-checkbox-row">
            <div className="search-list-checkbox">
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("underground")}
                checked={!!this.state.underground}
              />
              <span>Underground</span>
            </div>
            <div className="search-list-checkbox">
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("monthly")}
                checked={!!this.state.monthly}
              />
              <span>Monthly</span>
            </div>
            <div className="search-list-checkbox">
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("truck")}
                checked={!!this.state.truck}
              />
              <span>Truck</span>
            </div>
          </div>

          <div className="search-list-checkbox-row">
            <div className="search-list-checkbox">
              {" "}
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("solar")}
                checked={!!this.state.solar}
              />
              <span>Solar carport</span>
            </div>
            <div className="search-list-checkbox">
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("yearly")}
                checked={!!this.state.yearly}
              />
              <span>Yearly</span>
            </div>
            <div className="search-list-checkbox">
              <input
                type="checkbox"
                onChange={() => this.handleCheckBox("other")}
                checked={!!this.state.other}
              />
              <span>Other</span>
            </div>
          </div>
        </div>

        <div
          onClick={() => this.toggleSearchDiv()}
          className="search-list-toggle"
        >
          {this.state.searchDivVisible === "search-list-filters-off" ? (
            <Image className="search-list-arrow" src={ARROW_DOWN} />
          ) : (
            <Image className="search-list-arrow" src={ARROW_UP} />
          )}
          <span>Advanced Search</span>
          {this.state.searchDivVisible === "search-list-filters-off" ? (
            <Image className="search-list-arrow" src={ARROW_DOWN} />
          ) : (
            <Image className="search-list-arrow" src={ARROW_UP} />
          )}
        </div>

        {this.props.indexfirstload ? (
          <div className="search-list-loading">
            <Image className="search-list-loading-gif" src={LOADING_GIF} />
            <span>One moment please...</span>
          </div>
        ) : (
          <div>
            {noSearchResults ? (
              <div className="search-list-no-results">
                <span>
                  No active search or no spots satisfying search range.
                </span>
                <span>
                  Activate a search or expand search range to get local parking
                  spots!
                </span>
              </div>
            ) : (
              <div>
                <div className="search-list-container">
                  {listingsOnMain.map((spot, idx) => (
                    <SpotIndexItem key={idx} spot={spot} />
                  ))}
                </div>
                <div style={{ height: '400px', width: '400px',backgroundColor: 'green' }}>
       <GoogleMapReact
         bootstrapURLKeys={{ key:"AIzaSyAxvOQINmU2nBgyuOlHVaxpNsM8ISQpSeg"}}
         defaultCenter={{lat: this.state.pos.coords.latitude, lng: this.state.pos.coords.longitude}}
         defaultZoom={{zoom:11}}
       >
        {listingsOnMain.map((spot, idx) =>( <SpotIndexItem key={idx} spot={spot}
           lat={spot.geometry.coordinates[0]}
           lng={spot.geometry.coordinates[1]}
           text={'Kreyser Avrora'}
         />))
        }
       </GoogleMapReact>
     </div>
                <div className="search-list-load-more-div">
                  {this.state.spots.length > listingsOnMain.length ? (
                    <button
                      className="search-list-load-more"
                      onClick={() => this.loadMore()}
                    >
                      Load more
                    </button>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(SearchList);
