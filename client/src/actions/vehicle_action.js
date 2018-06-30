import * as VehicleAPIUtil from '../util/vehicle_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

const removeUser = (id) => ({
    type: REMOVE_USER,
    id
});

const receiveErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors
});

export const fetchVehicles = () => dispatch => (
    VehicleAPIUtil.fetchVehicles()
        .then(user => dispatch(receiveUser(user)))
        .catch(err => console.log(err))
);

export const fetchVehicle = (id) => dispatch => (
    VehicleAPIUtil.fetchVehicle(id)
        .then(user => dispatch(receiveUser(user)))
        .catch(err => console.log(err))
);

export const createVehicle = (vehicle) => dispatch => {

    return (
            VehicleAPIUtil.createVehicle(vehicle)
                .then(userRes => dispatch(receiveUser(userRes)))
                .catch(err => console.log(err))


    );
};


export const deleteVehicle = (id) => dispatch => (
    VehicleAPIUtil.deleteVehicle(id)
        .then(res => dispatch(removeUser(res.id)))
        .catch(err => console.log(err))
);
