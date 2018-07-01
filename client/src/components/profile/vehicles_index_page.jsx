import React from "react";
import { Link } from "react-router-dom";
import VehiclesIndexItem from "./vehicle_index_item";
class VehicleIndexPage extends React.Component {
  render() {
    const { vehicles } = this.props;
    if (vehicles.length > 0) {
      let cars = vehicles.map((vehicle, i) => {
        console.log(vehicles);
        return (
          <div>

          <VehiclesIndexItem key={vehicle._id} vehicle={vehicle} />

          </div>
        );
      });
      return cars;
    } else {
      return <div>You currently have no vehicles!</div>;
    }
  }
}

export default VehicleIndexPage;
