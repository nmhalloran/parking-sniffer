import React from "react";
import { Link, withRouter } from "react-router-dom";
import './profile.css'
// import ReservationsIndexPage from "./reservations_index_page";

class SpotsIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let spot = this.props.spot;
    let spotItemBgImgStyle = {
      backgroundImage: "url(" + spot.img_url + ")",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    };

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
      <Link
        to={`/spots/${spot._id}`}
        className="spot-display-link"
        to={`/spots/${spot._id}`}
      >
        <div className="spot-index-box">
          <div className="spot-item-img" style={spotItemBgImgStyle} />
          <div className="spot-display-city">{spot.city}</div>
          <div className="spot-display">
            ${spot.rental_rate} / {capitalizeFirstLetter(spot.rental_type)}
          </div>
        </div>
      </Link>
    );
  }
}

export default withRouter(SpotsIndexItem);
