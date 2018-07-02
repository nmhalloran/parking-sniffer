import React from "react";
import { Link } from "react-router-dom";

class VehiclesIndexItem extends React.Component {
  render() {
    let vehicle = this.props.vehicle;
    return (
      <Link to={`/vehicles/${vehicle._id}`} className="spot-display-link">
        <div className="spot-index-box">
          <div className="spot-item-img" />
          <div className="spot-display-city">{vehicle.model}</div>
          <div className="spot-display">
            {vehicle.year} / {vehicle.vehicle_type} {vehicle.color}{" "}
            {vehicle.plate_no}
          </div>
        </div>
      </Link>
    );
  }
}

export default VehiclesIndexItem;

// {/* render() {

//   function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }
//   return (
//     <Link
//       to={`/vehicles/${vehicle._id}`}
//       className="spot-display-link"
//     >
//       <div className="spot-index-box">
//         <div className="spot-item-img" />
//         <div className="spot-display-city">{vehicle.model}</div>
//         <div className="spot-display">
//           {vehicle.year} / {vehicle.vehicle_type) {vehicle.color} {vehicle.plate_no}
//         </div>
//       </div>
//     </Link>
//   );
// } */}
