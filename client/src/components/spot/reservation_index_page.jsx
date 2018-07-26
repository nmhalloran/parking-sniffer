import React from "react";
import ReservationIndexItem from "./reservation_index_item";
import { Link } from "react-router-dom";

class ReservationIndexPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.fetchReservations(this.props.spotId);
  }
  
  render() {
    if(this.props.reservations){
    const reservations= Array.from(this.props.reservations);
    if(reservations.length > 0){
    return(<div className="item-containers">
        {reservations.map((res, i) => (

        <div>
        <ReservationIndexItem reservation={res} key={i}
          updateReservation={this.props.updateReservation}
          deleteReservation={this.props.deleteReservation}
          currentUser={this.props.currentUser}/>
        </div>
      ))}
      </div>);
    }else{
      return(<div>
        No pending reservations
      </div>);
    }
  }else{
    return (<div></div>);
  }
  }
}

export default ReservationIndexPage;
