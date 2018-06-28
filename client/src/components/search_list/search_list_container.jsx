import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchList from './search_list'
import { clearErrors } from '../../actions/errors_actions';

const msp = (state,ownProps) =>({
  currentUser: state.isAuthenticated.user,
  isAuthenticated: state.isAuthenticated.isAuthenticated,
})


const mdp = (dispatch) =>({
clearErrors: () => dispatch(clearErrors()),
})


export default connect(msp,mdp)(SearchList)
