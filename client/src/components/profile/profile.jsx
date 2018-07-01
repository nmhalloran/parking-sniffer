import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfileParkingItem from "./profile_parking_item";
import "./profile.css";
import BuyerOrSeller from "./buyer_or_seller.jsx";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.currentUser = props.user;
    this.spots = props.spots;

  }

  render() {
    return (
      <div className="user-profile">
        <div id="user-profile-nav">
          <h4>Hello, {this.currentUser.name}!</h4>
          <div>
            <BuyerOrSeller
              user={this.currentUser}
            />
          </div>
        </div>

        <div id="user-profile-spots-requests">
          <div>My Parking Spots</div>
          <div> My Requests </div>
        </div>

        <div id="user-parking-spots">
          <ul>
            {this.spots.map(spot => {
              return <ProfileParkingItem spot={spot} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Profile;
