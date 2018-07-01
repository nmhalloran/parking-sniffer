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
      <Link to={`/spots/${spot._id}`}>
        <li className="item-container">
          <img src={spot.img_url} />
          {/* <h3 className="indexed-title-text">{spot.description}</h3> */}
        </li>
      </Link>
    );
  }
}

export default withRouter(SpotsIndexItem);
