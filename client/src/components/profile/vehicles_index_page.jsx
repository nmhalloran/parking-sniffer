import React from "react";
import { Link } from "react-router-dom";

class VehicleIndexPage extends React.Component {
  render() {
    const { vehicles } = this.props;
    return (
      <div>
        <div className="profile-section-container">
          You have {vehicles.length} Vehicles!
        </div>
      </div>
    );
  }
}

export default VehicleIndexPage;
