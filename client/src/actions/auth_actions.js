import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";
import { CLEAR_ERRORS, ADD_ERRORS } from "./errors_actions";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

// sets current user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

// signs up user
export const createUser = (user, history) => dispatch => {
  axios
    .post("/api/users/register", user) // method, url, and data
    .then(res => history.push("/signin"))
    .catch(error =>
      dispatch({
        type: ADD_ERRORS,
        payload: error.response.data
      })
    );
};

// let demoUser = { email: "superdad@gmail.com", password: "123456" };

// export const loginDemo = () => dispatch => {
//   axios
//     .post("api/users/login", demoUser)
//     .then(res => {
//       const { token } = res.data;
//
//       localStorage.setItem("jwtToken", token);
//
//       setAuthToken(token);
//
//       const decoded = jwt_decode(token);
//
//       dispatch(setCurrentUser(decoded));
//     })
//     .catch(error =>
//       dispatch({
//         type: ADD_ERRORS,
//         payload: error.response.data
//       })
//     );
// };
// logs in user
export const loginUser = user => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      //save to local storage
      const { token } = res.data;
      // set token to local storage
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(error =>
      dispatch({
        type: ADD_ERRORS,
        payload: error.response.data
      })
    );
};

// log out user
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
