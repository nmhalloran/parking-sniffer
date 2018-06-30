import React from "react";
import { Link } from "react-router-dom";
import EmptyProfilePage from "./empty_profile_page.jsx";
import SpotsIndexPage from "./spots_index_page.jsx";
import ReservationsIndexPage from "./reservations_index_page.jsx";
import VehiclesIndexPage from "./vehicles_index_page.jsx";

class BuyerOrSeller extends React.Component {
  render() {
    let user = this.props.user;

    if (!user.spots && !user.vehicles) {
      return <EmptyProfilePage />;
    } else if (!user.spots) {
      return (
        <div>
          <VehiclesIndexPage vehicles={user.vehicles} />
          <ReservationsIndexPage reservations={user.reservations} />
        </div>
      );
    } else {
      return (
        <div>
          <SpotsIndexPage spots={user.spots} />
        </div>
      );
    }
  }
}

export default BuyerOrSeller;
