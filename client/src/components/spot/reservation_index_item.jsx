import React from "react";
import { Link } from "react-router-dom";

class ReservationIndexItem extends React.Component {
  acceptReservation(){
    let newState={
      _id:this.props.reservation._id,
      booking_status: 'accepted'
    };
    this.props.updateReservation(this.props.spotId,newState);
  }
  renderStatusButtons(){
    if (this.props.reservation.booking_status === "pending"){
      return (
      <div>
        <button onClick={() => this.acceptReservation()}>Accept</button>
        <button
          onClick={()=>this.props.deleteReservation(this.props.spotId,this.props.reservation)}>Decline</button>
      </div>);
    }else{
      <div>

      </div>
    }
  }
  render() {
    let reservation = this.props.reservation;
    return (
      <li key={reservation._id} className="item-container">
        <Link to={`/reservations/${reservation._id}`}>
          {reservation._id}</Link>
        {this.renderStatusButtons()}
      </li>
    );
  }
}

export default ReservationIndexItem;
