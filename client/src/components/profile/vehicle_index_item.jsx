import React from "react";
import { Link } from "react-router-dom";

class VehiclesIndexItem extends React.Component {
  render() {
    let vehicle = this.props.vehicle;
    return (
      <Link to={`/vehicles/${vehicle._id}`}>
        <div className="item-container">
          {vehicle.model}
          {/* <h3 className="indexed-title-text">{spot.description}</h3> */}
        </div>
      </Link>
    );
  }
}

export default VehiclesIndexItem;
