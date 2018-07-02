import { connect } from "react-redux";
import React from "react";
import{
  fetchCurrentUser
} from "../../actions/user_actions";
import { fetchSpot, fetchSpotById, deleteSpot } from "../../actions/spot_actions";
import { createReservation } from "../../actions/reservation_actions";
import { fetchVehicles } from "../../actions/vehicle_actions"
import ShowSpot from "./show_spot";
import { clearErrors } from '../../actions/errors_actions';
const mapStateToProps = (state, ownProps) => (
  {
    spotId: ownProps.match.params.id,
    spot: state.entities.spots[ownProps.match.params.id],
    user: state.isAuthenticated.user,
    vehicles: Object.values(state.entities.vehicles),
    isAuthenticated: state.isAuthenticated.isAuthenticated,
    errors: Object.values(state.errors)
  }
);


const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSpotById: id => dispatch(fetchSpotById(id)),
  fetchSpot: id => dispatch(fetchSpot(id)),
  deleteSpot: id => dispatch(deleteSpot(id)),
  clearErrors: () => dispatch(clearErrors()),
  createReservation: (spot_id, data) =>
    dispatch(createReservation(spot_id, data)),
  fetchVehicles: () => dispatch(fetchVehicles())
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowSpot);
