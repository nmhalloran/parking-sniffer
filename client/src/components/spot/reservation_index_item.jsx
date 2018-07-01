import React from "react";
import { Link } from "react-router-dom";

class ReservationIndexItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true
    };
  }
  acceptReservation(){
    let newState={
      _id:this.props.reservation._id,
      booking_status: 'accepted'
    };
    this.props.updateReservation(this.props.spotId,newState);
    this.setState({loading:false});
  }
  delete(){
    this.props.deleteReservation(this.props.spotId,this.props.reservation);
    this.setState({loading:false});
  }
  renderStatusButtons(){
    if ((this.props.currentUser.id === this.props.reservation.seller_id)&&(this.props.reservation.booking_status === "pending")){
      return (
      <div>
        <button onClick={() => this.acceptReservation()}>Accept</button>
        <button
          onClick={()=>this.delete()}>Decline</button>
      </div>);
    }else{
      return(
      <div>

      </div>);
    }
  }
  render() {
    let reservation = this.props.reservation;
    return (
      <li key={reservation._id} className="item-container">
          {reservation._id}
        {this.renderStatusButtons()}
      </li>
    );
  }
}

export default ReservationIndexItem;
