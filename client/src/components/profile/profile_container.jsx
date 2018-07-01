import { connect } from "react-redux";
import React from "react";

import {
  fetchSpot,
  fetchSpotsByGPS,
  fetchSpotsByZip
} from "../../actions/spot_actions";
import { fetchReservations } from "../../actions/reservation_actions";
import Profile from "./profile";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.isAuthenticated.user,
    spots: Object.values(state.entities.spots).filter(
      spot => spot.owner_id === state.isAuthenticated.user.id
    ),
    reservations: state.entities.reservations
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSpot: id => dispatch(fetchSpot(id)),
  fetchReservations: id => dispatch(fetchReservations(id)),
  fetchSpotsByGPS: gps => dispatch(fetchSpotsByGPS(gps)),
  fetchSpotsByZip: zip => dispatch(fetchSpotsByZip(zip))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
