import { connect } from "react-redux";
import React from "react";

import { fetchVehicle,deleteVehicle } from "../../actions/vehicle_actions";
import ShowVehicle from "./show_vehicle";

const mapStateToProps = (state, ownProps) => {
  return {
    // vehicle from backend
    vehicle: state.entities.vehicles[ownProps.match.params.id],
    user: state.isAuthenticated.user,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchVehicle: id => dispatch(fetchVehicle(id)),
  deleteVehicle: id => dispatch(deleteVehicle(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowVehicle);
