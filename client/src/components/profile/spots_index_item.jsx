import React from "react";
import { Link, withRouter } from "react-router-dom";
// import ReservationsIndexPage from "./reservations_index_page";

class SpotsIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let spot = this.props.spot;

    return (
      <li className="item-container">
        <Link to={`/spots/${spot._id}`}>{spot.description}</Link>
        {/* <h3 className="indexed-title-text">{spot.description}</h3> */}
      </li>
    );
  }
}

export default withRouter(SpotsIndexItem);
