import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./profile.css";
import "./random.css";
import BuyerOrSeller from "./buyer_or_seller.jsx";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser =this.props.user;
    this.spots =this.props.spots;
  }
  componentWillMount(){
    this.props.fetchCurrentUser();
  }

  render() {
  
    return (
      <div className="user-profile">
        <div id="user-profile-nav">
          <h4>Hello, {this.props.user.name}!</h4>
          <div>
            <BuyerOrSeller user={this.props.user} />
          </div>
        </div>

        <div id="user-parking-spots">
          <ul>
            {this.spots.map(spot => {
              //return <ProfileParkingItem spot={spot} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Profile;
