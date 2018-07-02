import { RECEIVE_VEHICLES, RECEIVE_VEHICLE, REMOVE_VEHICLE }
from '../actions/vehicle_actions';
import merge from "lodash/merge";

const VehiclesReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState;

    switch (action.type) {
        case RECEIVE_VEHICLES:
            let newState = Object.assign({}, state)
            let vehicles = action.vehicles.data
            vehicles.forEach(vehicle => {
                Object.assign(newState, {[vehicle._id]: vehicle})
            })
            return newState;

        case RECEIVE_VEHICLE:
        let vehicle = action.vehicle.data;
        return Object.assign({}, state, {[vehicle._id]: vehicle});

        case REMOVE_VEHICLE:
            newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
};

export default VehiclesReducer;
