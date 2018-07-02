import { RECEIVE_VEHICLES, RECEIVE_VEHICLE, REMOVE_VEHICLE }
from '../actions/vehicle_actions';
import merge from "lodash/merge";

const VehiclesReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState;

    switch (action.type) {
        case RECEIVE_VEHICLES:
            return action.vehicles.data.vehicles;

        case RECEIVE_VEHICLE:
            newState = Object.assign({}, state);
            let vehicles = action.vehicle.data;
            vehicles.forEach((vehicle) => {
                Object.assign(newState, {[vehicle._id]: vehicle})
            })
            debugger
            return newState;

        case REMOVE_VEHICLE:
            newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
};

export default VehiclesReducer;
