import { connect } from "react-redux";
import React from "react";
import { clearErrors } from '../../actions/errors_actions';
import { fetchVehicle,deleteVehicle } from "../../actions/vehicle_actions";
import ShowVehicle from "./show_vehicle";

const mapStateToProps = (state, ownProps) => {
  debugger
  return {
    VehicleId: ownProps.match.params.id,
    vehicle: state.entities.vehicles[ownProps.match.params.id],
    user: state.isAuthenticated.user,
    isAuthenticated: state.isAuthenticated.isAuthenticated,
    errors: Object.values(state.errors)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchVehicle: id => dispatch(fetchVehicle(id)),
  deleteVehicle: id => dispatch(deleteVehicle(id)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowVehicle);
