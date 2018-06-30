import { connect } from "react-redux";
import React from "react";

import { createSpot } from '../../actions/spot_actions';
import CreateSpot from './create_spot';

const mapStateToProps = (state, ownProps) => {

    return ({
        spot: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            zipcode: '',
            description: '',
            vehicle_types: [],
            spot_type: '',
            rental_rate: '',
            rental_type: '',
            img_url: '',
            latitude: '',
            longitude: ''
        }
    });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    createSpot: (spot) => dispatch(createSpot(spot))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSpot);
