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
<<<<<<< HEAD
        <Link to={`/spots/${spot._id}`}>
          <img src={spot.img_url} />
        </Link>
=======
        <Link to={`/spots/${spot._id}`}>{spot.description}</Link>
      
>>>>>>> 5e444b97595c04339b09074d233068d89c1ee52a
        {/* <h3 className="indexed-title-text">{spot.description}</h3> */}
      </li>
    );
  }
}

export default withRouter(SpotsIndexItem);
