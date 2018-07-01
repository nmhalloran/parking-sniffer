import React from "react";
import { Link } from "react-router-dom";

class VehiclesIndexItem extends React.Component {
  render() {
    let vehicle = this.props.vehicle;
    console.log(vehicle._id, " VEHICLE ID");
    return (
      <li className="item-container">
        <Link to={`/vehicles/${vehicle._id}`}>{vehicle.model}</Link>
        {/* <h3 className="indexed-title-text">{spot.description}</h3> */}
      </li>
    );
  }
}

export default VehiclesIndexItem;
