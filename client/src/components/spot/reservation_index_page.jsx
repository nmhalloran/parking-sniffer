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
    return(<div>
        {reservations.map((res, i) => (

        <div>
        <ReservationIndexItem reservation={res} key={i} />
        </div>
      ))};
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
