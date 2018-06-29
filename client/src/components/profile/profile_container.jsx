import { connect } from "react-redux";
import React from "react";

import { fetchSpot, fetchSpots } from "../../actions/spot_actions";
import Profile from "./profile";

const mapStateToProps = (state, ownProps) => {

    return {
        user: state.isAuthenticated.user,
        spots: Object.values(state.entities.spots).filter(spot => spot.owner_id === state.isAuthenticated.user.id),

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSpot: id => dispatch(fetchSpot(id)),
    fetchSpots: () => dispatch(fetchSpots())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
