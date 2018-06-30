import React, { Component } from "react";
import App from "./app";

import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken.js";
import { setCurrentUser, logoutUser } from "./actions/auth_actions";
// import { clearCurrentProfile } from './actions/profileActions';

// const Root = ({ store }) =>{

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    //Bootstrap user info from cookies

    // Check for token
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      this.store.dispatch(setCurrentUser(decoded));

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout user
        this.store.dispatch(logoutUser());
        // Clear current Profile
        // store.dispatch(clearCurrentProfile());
        // Redirect to login
        window.location.href = "/login";
      }
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    );
  }
}

export default Root;
