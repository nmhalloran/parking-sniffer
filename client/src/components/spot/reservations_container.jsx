import { connect } from "react-redux";
import React from "react";

import {
  fetchReservations,
  updateReservation,
  deleteReservation
} from "../../actions/reservation_actions";
import ReservationIndexPage from "./reservation_index_page";

const mapStateToProps = (state, ownProps) => {
  return {
    reservations: state.entities.reservations,
    currentUser: state.isAuthenticated.user
  };
};

const mapDispatchToProps = dispatch => ({
  fetchReservations: (spot_id) => dispatch(fetchReservations(spot_id)),
  updateReservation: (spot_id, reservation) =>
    dispatch(updateReservation(spot_id, reservation)),
  deleteReservation: id => dispatch(deleteReservation(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationIndexPage);
