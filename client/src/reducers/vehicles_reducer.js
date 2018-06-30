import { RECEIVE_VEHICLES, RECEIVE_VEHICLE, REMOVE_VEHICLE } from '../actions/Vehicle_actions';
import merge from "lodash/merge";

const VehiclesReducer = (state = {}, action) => {
    Object.freeze(state);



    switch (action.type) {
        case RECEIVE_VEHICLES:
            return action.Vehicles.data.Vehicles;

        case RECEIVE_VEHICLE:
            return merge({}, state, {[action.Vehicle._id]: action.Vehicle});

        case REMOVE_VEHICLE:
            let newState = merge({}, state);
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
};

export default VehiclesReducer;
