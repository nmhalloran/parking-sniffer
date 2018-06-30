import { CLEAR_ERRORS, ADD_ERRORS } from '../actions/errors_actions';
const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
