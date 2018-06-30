import { RECEIVE_SPOTS, RECEIVE_SPOT, REMOVE_SPOT } from '../actions/spot_actions';
import merge from "lodash/merge";

const spotsReducer = (state = {}, action) => {
    Object.freeze(state);

    

    switch (action.type) {
        case RECEIVE_SPOTS:
            return action.spots.data.spots;

        case RECEIVE_SPOT:
            debugger
            return merge({}, state, {[action.spot._id]: action.spot});

        case REMOVE_SPOT:
            let newState = merge({}, state)
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
}

export default spotsReducer;
