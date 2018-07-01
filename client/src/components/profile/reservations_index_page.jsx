import React from "react";
import ReservationsIndexItem from "./reservations_index_item";
import { Link } from "react-router-dom";

class ReservationsIndexPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.fetchReservations = this.props.fetchReservations.bind(this);
  // }

  componentDidMount() {
    this.props.fetchReservations(this.props.spotId);
  }

  render() {
    console.log(this.props.reservations, "What is here outside filter?");
    if (this.props.reservations) {
      let reservations = this.props.reservations.filter(reservation => {
        reservation.spot_id === this.props.spotId;
      });
      console.log(reservations, " What is hereafter filter");
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
