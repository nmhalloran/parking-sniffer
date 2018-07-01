import { RECEIVE_RESERVATIONS, RECEIVE_RESERVATION, REMOVE_RESERVATION } from '../actions/reservation_actions';
import merge from "lodash/merge";

const reservationsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_RESERVATIONS:
            return action.reservations.data;

        case RECEIVE_RESERVATION:
            let res = action.reservation.data;
            return merge({}, state, { res});

        case REMOVE_RESERVATION:
            let newState = merge({}, state)
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
}

export default reservationsReducer;
