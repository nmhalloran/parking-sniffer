import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
//import { LOADING_GIF } from '../../img/index';
class ShowVehicle extends React.Component{
  constructor(props) {
      super(props);

      this.currentUser = props.user;
      this.state = props.vehicle;

  }
  componentDidMount() {
      this.props.fetchVehicle(this.props.VehicleId);
  }
  handleDelete(e){
    this.props.deleteVehicle(this.props.match.params.id);
  }
  componentWillUnmount(){
  //Erasing any errors...
  this.props.clearErrors();

  }
  render(){
    if(!this.props.vehicle && this.props.errors.length > 0){
      //No spot available and some error occured...
      return(<div className="search-list-loading">

              <span>Sorry, error occured.</span>
              </div>);

    }else if(!this.props.vehicle){
      //Waiting for backend to send back our spot...
     return(<div className="search-list-loading">
             <span>One moment please...</span>
             </div>);
    }else{
    return (
      <div>
        <h1>Vehicle Show Page</h1>
        <h2>Vehicle Type: {this.props.vehicle.vehicle_type}</h2>
        <h2>Plate No: {this.props.vehicle.plate_no}</h2>
        <h2>Color: {this.props.vehicle.color}</h2>
        <h2>Model: {this.props.vehicle.model}</h2>
        <h2>Year: {this.props.vehicle.year}</h2>
        <button value="Delete Vehicle" onClick={ (e) => this.handleDelete(e) }>
          Delete Vehicle
        </button>
      </div>
    );
  }
  }
}

export default ShowVehicle;
