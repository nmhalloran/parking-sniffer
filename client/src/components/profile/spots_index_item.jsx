import React from "react";
import { Link } from "react-router-dom";

class SpotsIndexItem extends React.Component {
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

export default SpotsIndexItem;
