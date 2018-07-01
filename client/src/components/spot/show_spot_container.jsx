import { connect } from "react-redux";
import React from "react";

import { fetchSpot } from "../../actions/spot_actions";
import { createReservation } from "../../actions/reservation_actions";
import ShowSpot from "./show_spot";
import { clearErrors } from '../../actions/errors_actions';
const mapStateToProps = (state, ownProps) => (
  {
    spotId: ownProps.match.params.id,
    spot: state.entities.spots[ownProps.match.params.id],
    user: state.isAuthenticated.user,
    isAuthenticated: state.isAuthenticated.isAuthenticated,
    errors: Object.values(state.errors)
  }
);


const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSpot: id => dispatch(fetchSpot(id)),
  clearErrors: () => dispatch(clearErrors()),
  createReservation: (spot_id, data) =>
    dispatch(createReservation(spot_id, data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowSpot);
