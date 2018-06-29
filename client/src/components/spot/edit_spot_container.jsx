import { connect } from "react-redux";
import React from "react";

import { updateSpot } from '../../actions/spot_actions';
import EditSpot from './edit_spot'

const mapStateToProps = (state, ownProps) => {

    return ({
        // spot: state.entities.spots[ownProps.match.params.id], //request spot from backend
        spot: {
            line1: '825',
            line2: 'Battery St.',
            city: 'san francisco',
            state: 'ca',
            zipcode: 94111,
            description: 'lalalalal',
            vehicle_types: [],
            spot_type: 'Canopy Parking Lot',
            rental_rate: 1000,
            rental_type: 'daily',
            img_url: '',
            reservations: [],
            latitude: '',
            longitude: ''
        }
    })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSpot: (id) => dispatch(updateSpot(id)),
    updateSpot: (spot) => dispatch(updateSpot(spot))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSpot);