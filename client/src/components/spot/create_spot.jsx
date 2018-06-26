import React from "react";
import { withRouter } from "react-router-dom";

class CreateSpot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: {
                line1: '',
                line2: '',
                city: '',
                state: '',
                zipcode: undefined    
            },
            description: '',
            vehicle_types: [],
            spot_type: '',
            rental_rate: undefined,
            rental_type: '',
            img_url: '',
            reservations: []
        }
    }

    renderMap() {
        var map;
        var marker;

        map = new google.maps.Map(document.getElementById("map2"), {
          center: { lat: 37.798965, lng: -122.4013603 }, // App Academy coordinates
          zoom: 18
        });

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(37.7989650, -122.4013603),
            title: "App Academy, SF",
            map: map
        })
    }

    render() {
        return (

        <div>
            <h4> Create a new Parking Spot </h4>

            <button>Upload Image</button>

            <div className="Address">
                <label> Address: </label>
                <div id="building-street">
                    <input type="text" placeholder="Building" value={this.state.line1} />
                    <input type="text" placeholder="Street"  value={this.state.line2} />
                </div>
                <div id="city-state-zip">
                    <input type="text" placeholder="City/Town" value={this.state.city} />
                    <input type="text" placeholder="State" value={this.state.state} />
                    <input type="number" placeholder="Zip Code" value={this.state.zipcode} />
                </div>
            </div>

            <div id="map2"></div>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAidLpThnbgE6N1QcSteTh3kdzkPR6W7dE&callback=initMap" async
                defer></script>
        </div>

        )
        
    }
};

export default withRouter(CreateSpot);