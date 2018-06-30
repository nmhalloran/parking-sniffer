import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchList from './search_list'
import { clearErrors } from '../../actions/errors_actions';
import { fetchSpotsByGPS, fetchSpotsByZip } from '../../actions/spot_actions';
const msp = (state,ownProps) =>({
  currentUser: state.isAuthenticated.user,
  isAuthenticated: state.isAuthenticated.isAuthenticated,
  spots: state.entities.spots,
  zip: state.entities.spots.zip,
  range: state.entities.spots.ranges
})


const mdp = (dispatch) =>({
clearErrors: () => dispatch(clearErrors()),
fetchSpotsByGPS: (gps) => dispatch(fetchSpotsByGPS(gps)),
fetchSpotsByZip: (zip) => dispatch(fetchSpotsByZip(zip))
})


export default connect(msp,mdp)(SearchList)
