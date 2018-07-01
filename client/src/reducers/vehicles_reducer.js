import { RECEIVE_VEHICLES, RECEIVE_VEHICLE, REMOVE_VEHICLE }
from '../actions/vehicle_actions';
import merge from "lodash/merge";

const VehiclesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_VEHICLES:
            return action.vehicles.data.vehicles;

        case RECEIVE_VEHICLE:
            debugger;
            let vehicle = action.vehicle.data;
            return Object.assign({}, state, {[vehicle._id]: vehicle});

        case REMOVE_VEHICLE:
            let newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
};

export default VehiclesReducer;
