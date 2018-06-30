import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class ShowVehicle extends React.Component{
  constructor(props) {
      super(props);

      this.currentUser = props.user;
      this.state = props.vehicle;

  }
  componentDidMount() {
      this.props.fetchVehicle(this.props.match.params.id);
  }
  handleDelete(e){
    this.props.deleteVehicle(this.props.match.params.id);
  }

  render(){
    return (
      <div>
        <h1>Vehicle Show Page</h1>
        <h2>Vehicle Type: ${this.props.vehicle.vehicle_type}</h2>
        <h2>Plate No: ${this.props.vehicle.plate_no}</h2>
        <h2>Color: ${this.props.vehicle.color}</h2>
        <h2>Model: ${this.props.vehicle.model}</h2>
        <h2>Year: ${this.props.vehicle.year}</h2>
        <button value="Delete Vehicle" onClick={ (e) => this.handleDelete(e) }>
          Delete Vehicle
        </button>
      </div>
    );
  }
}
