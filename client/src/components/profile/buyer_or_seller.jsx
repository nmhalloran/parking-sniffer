import React from "react";
import { Link } from "react-router-dom";
import EmptyProfilePage from "./empty_profile_page";
import SpotsIndexPage from "./spots_index_page";
// import ReservationsIndexPage from "./reservations_index_page";
import VehiclesIndexPage from "./vehicles_index_page";
import SearchListContainer from "../search_list/search_list_container";
import "./buyer_or_seller.css";

class BuyerOrSeller extends React.Component {
  render() {
    let user = this.props.user;

    if (!user.spots && !user.vehicles) {
      return (
        <div>
          <SearchListContainer />
          <EmptyProfilePage />;
        </div>
      );
    } else if (!user.spots) {
      return (
        <div>
          <div>
            <SearchListContainer />
            <VehiclesIndexPage vehicles={user.vehicles} />
            <Link className="button-stying" to="/vehicle/new">
              CREATE A NEW VEHICLE
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="profile-body">
          <SearchListContainer />
          <div className="index-title">
            Your Spots:
            <Link to={"/spots/new"} className="button-styling">
              CREATE A PARKING SPOT
            </Link>
          </div>
          <div className="index-wrapper">
            <SpotsIndexPage spots={user.spots} />
          </div>
          <div className="index-title">
            Your Vehicles:
            <Link className="button-stying" to="/vehicle/new">
              CREATE A NEW VEHICLE
            </Link>
          </div>

          <div className="index-wrapper">
            <VehiclesIndexPage vehicles={user.vehicles} />
          </div>
        </div>
      );
    }
  }
}

export default BuyerOrSeller;
