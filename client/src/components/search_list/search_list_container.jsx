import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchList from './search_list'
import { clearErrors } from '../../actions/errors_actions';
import { fetchSpots } from '../../actions/spot_actions';
const msp = (state,ownProps) =>({
  currentUser: state.isAuthenticated.user,
  isAuthenticated: state.isAuthenticated.isAuthenticated,
})


const mdp = (dispatch) =>({
clearErrors: () => dispatch(clearErrors()),
fetchSpots: (spots) => dispatch(fetchSpots(spots))
})


export default connect(msp,mdp)(SearchList)
