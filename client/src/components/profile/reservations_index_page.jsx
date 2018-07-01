import React from "react";
import ReservationsIndexItem from "./reservations_index_item";
import { Link } from "react-router-dom";

class ReservationsIndexPage extends React.Component {
  render() {
    const { reservations } = this.props;
    if (reservations.length > 0) {
      let bookings = reservations.map((reservation, i) => {
        return <ReservationsIndexItem reservation={reservation} />;
      });
      return bookings;
    } else {
      return <div>You currently have no reservations</div>;
    }
  }
}

export default ReservationsIndexPage;
