import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from './topnavbar'
import { logoutUser , loginUser  } from '../../actions/auth_actions'
import { clearErrors } from '../../actions/errors_actions';

const msp = (state,ownProps) =>({
  currentUser: state.isAuthenticated.user,
  isAuthenticated: state.isAuthenticated.isAuthenticated,
  errors: Object.values(state.errors),
})


const mdp = (dispatch) =>({
logoutUser: () => dispatch(logoutUser()),
loginUser: (user) => dispatch(loginUser(user)),
loginDemo: () => dispatch(loginUser({email: "superdad@gmail.com", password: "123456"})),
clearErrors: () => dispatch(clearErrors()),
})


export default connect(msp,mdp)(TopNavBar)
