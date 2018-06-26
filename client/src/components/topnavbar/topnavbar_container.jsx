import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from './topnavbar'
import { logoutUser } from '../../actions/auth_actions'


const msp = (state) =>({
  currentUser: state.isAuthenticated.user,
  isAuthenticated: state.isAuthenticated.isAuthenticated,
})


const mdp = (dispatch) =>({
logoutUser: () => dispatch(logoutUser())
})


export default connect(msp,mdp)(TopNavBar)
