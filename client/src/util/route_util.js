import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      !loggedIn ? <Component {...props} /> : <Redirect to="/user/profile" />
    }
  />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      loggedIn ? <Component {...props} /> : <Redirect to="/signin" />
    }
  />
);

const mapStateToProps = state => {
  console.log(state);
  return { loggedIn: Boolean(state.isAuthenticated.isAuthenticated) };
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
