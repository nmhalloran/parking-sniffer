import { connect } from "react-redux";
import React from "react";

import { createVehicle } from '../../actions/vehicle_actions';
import CreateVehicle from './create_vehicle';

const mapStateToProps = (state, ownProps) => {

    return ({
        vehicle: {
            vehicle_type: '',
            plate_no: '',
            color: '',
            model: '',
            year: ''
        }
    });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    createVehicle: (vehicle) => dispatch(createVehicle(vehicle))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateVehicle);
