import * as VehicleAPIUtil from '../util/vehicle_api_util';

export const RECEIVE_VEHICLES = 'RECEIVE_VEHICLES';
export const RECEIVE_VEHICLE = 'RECEIVE_VEHICLE';
export const REMOVE_VEHICLE = 'REMOVE_VEHICLE';
export const RECEIVE_VEHICLE_ERRORS = 'RECEIVE_VEHICLE_ERRORS';

const receiveVehicles = vehicles => ({
    type: RECEIVE_VEHICLES,
    vehicles
});

const receiveVehicle = vehicle => ({
    type: RECEIVE_VEHICLE,
    vehicle
});

const removeVehicle = (id) => ({
    type: REMOVE_VEHICLE,
    id
});

const receiveErrors = errors => ({
    type: RECEIVE_VEHICLE_ERRORS,
    errors
});

export const fetchVehicles = () => dispatch => (
    VehicleAPIUtil.fetchVehicles()
        .then(vehicles => dispatch(receiveVehicles(vehicles)))
        .catch(err => console.log(err))
);

export const fetchVehicle = (id) => dispatch => (
    VehicleAPIUtil.fetchVehicle(id)
        .then(vehicle => dispatch(receiveVehicle(vehicle)))
        .catch(err => console.log(err))
);

export const createVehicle = (vehicle) => dispatch => {

    return (
            VehicleAPIUtil.createVehicle(vehicle)
                .then(vehicleRes => dispatch(receiveVehicle(vehicleRes)))
                .catch(err => console.log(err))


    );
};


export const deleteVehicle = (id) => dispatch => (
    VehicleAPIUtil.deleteVehicle(id)
        .then(res => dispatch(removeVehicle(res.id)))
        .catch(err => console.log(err))
);
