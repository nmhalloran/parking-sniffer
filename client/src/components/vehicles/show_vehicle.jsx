import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./show_vehicle.css";
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
    this.props.deleteVehicle(this.props.match.params.id)
    .then((_)=>this.props.history.push(`/user/profile`));
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
      <div className="showVehicle">
        <div className="showVehicle-Info">
          <div className="vehicle-Info">
            <h3>Vehicle Information</h3>
            <div className="vehicle-info-body">
              <h5>Vehicle Type: {this.props.vehicle.vehicle_type}</h5>
              <h5>Plate No: {this.props.vehicle.plate_no}</h5>
              <h5>Color: {this.props.vehicle.color}</h5>
              <h5>Model: {this.props.vehicle.model}</h5>
              <h5>Year: {this.props.vehicle.year}</h5>
           </div>
           <div className="vehicle-info-button">
              <button value="Delete Vehicle"
                onClick={ (e) => this.handleDelete(e) }>
                Delete Vehicle
              </button>
          </div>
        </div>
        </div>
      </div>
    );
  }
  }
}

export default ShowVehicle;
