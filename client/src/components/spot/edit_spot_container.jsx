import { connect } from "react-redux";
import React from "react";

import { fetchSpotById, updateSpot } from '../../actions/spot_actions';
import { clearErrors } from "../../actions/errors_actions";
import EditSpot from './edit_spot'

const mapStateToProps = (state, ownProps) => {

    return ({
        spot: state.entities.spots[ownProps.match.params.id], //request spot from backend
        spotId: ownProps.match.params.id,
        user: state.isAuthenticated.user,
        isAuthenticated: state.isAuthenticated.isAuthenticated,
        errors: Object.values(state.errors)
    })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSpotById: id => dispatch(fetchSpotById(id)),
    clearErrors: () => dispatch(clearErrors()),
    updateSpot: (spot) => dispatch(updateSpot(spot))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSpot);
