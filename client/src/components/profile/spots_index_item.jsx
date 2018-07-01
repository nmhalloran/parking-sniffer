import React from "react";
import { Link, withRouter } from "react-router-dom";
import ReservationsIndexPage from "./reservations_index_page";

class SpotsIndexItem extends React.Component {
  constructor(props) {
    super(props);
    // this.fetchReservations = this.fetchReservations.bind(this);
  }

  componentDidMount() {
    this.props.fetchReservations(this.props.spot._id);
  }
  render() {
    let spot = this.props.spot;
    return (
      <li className="item-container">
        <Link to={`/spots/${spot._id}`}>{spot.description}</Link>
        <ReservationsIndexPage
          spotId={spot._id}
          reservations={this.props.reservations}
          fetchReservations={this.props.fetchReservations}
        />
        {/* <h3 className="indexed-title-text">{spot.description}</h3> */}
      </li>
    );
  }
}

export default withRouter(SpotsIndexItem);
