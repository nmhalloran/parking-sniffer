import { SET_CURRENT_USER } from "../actions/auth_actions";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      let isAuthenticated = false;
      if (action.payload.id !== undefined) {
        isAuthenticated = true;
      }

      return {
        ...state,
        isAuthenticated: isAuthenticated,
        user: action.payload
      };
    default:
      return state;
  }
}
