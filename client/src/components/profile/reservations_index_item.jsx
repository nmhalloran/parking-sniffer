import React from "react";
import { Link } from "react-router-dom";

class ReservationsIndexItem extends React.Component {
  render() {
    let reservation = this.props.reservation;
    return (
      <li key={reservation._id} className="item-container">
        <Link to={`/reservations/${reservation._id}`}>{reservation.date}</Link>
      </li>
    );
  }
}

export default ReservationsIndexItem;
