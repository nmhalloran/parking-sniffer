import React from "react";
import { Link } from "react-router-dom";

class ReservationIndexItem extends React.Component {
  render() {
    let reservation = this.props.reservation;
    return (
      <li key={reservation._id} className="item-container">
        <Link to={`/reservations/${reservation._id}`}>
          {reservation.spot_id}</Link>
      </li>
    );
  }
}

export default ReservationIndexItem;
