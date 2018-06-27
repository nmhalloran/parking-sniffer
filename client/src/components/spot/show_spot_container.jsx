import { connect } from "react-redux";
import React from "react";

import { fetchSpot } from "../../actions/spot_actions";
import ShowSpot from "./show_spot";

const mapStateToProps = (state, ownProps) => {
  return {
    // add to this later
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSpot: id => dispatch(fetchSpot(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowSpot);
