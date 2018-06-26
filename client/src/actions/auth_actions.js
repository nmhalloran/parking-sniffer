import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_ERRORS = ' GET_ERRORS';

// sets current user
export const setCurrentUser = decoded => ({
    type: SET_CURRENT_USER,
    payload: decoded
});

// signs up user
export const createUser = (user, history) => dispatch => {
    axios
      .post('/api/users/register', user) // method, url, and data
      .then(res => history.push('/login'))
      .catch(error => dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        })
      );
};

// logs in user
export const loginUser = (user) => dispatch => {
    axios
      .post('/api/users/login', user)
      .then(res => {
        //save to local storage
        const { token } = res.data;
        
        // set token to local storage
        localStorage.setItem('jwtToken', token);

        // set token to auth header
        setAuthToken(token);

        // Decode token to get user data
        const decoded = jwt_decode(token);

        // Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(error => dispatch({
        type: GET_ERRORS,
        payload: error.response.data
        })
      );
}

// log out user
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
