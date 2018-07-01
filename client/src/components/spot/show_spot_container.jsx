import { connect } from "react-redux";
import React from "react";

import { fetchSpot } from "../../actions/spot_actions";
import { createReservation } from "../../actions/reservation_actions";
import ShowSpot from "./show_spot";
import { clearErrors } from "../../actions/errors_actions";
const mapStateToProps = (state, ownProps) => ({
  spotId: ownProps.match.params.id,
  spot: state.entities.spots[ownProps.match.params.id],
  user: state.isAuthenticated.user,
  isAuthenticated: state.isAuthenticated.isAuthenticated,
  errors: Object.values(state.errors)
});
// return {
//   // spot: state.entities.spots[ownProps.match.params.id], // spot from backend
//
//   spot: { // test spot
//     line1: '825',
//     line2: 'Battery St.',
//     city: 'San Francisco',
//     state: 'CA',
//     zipcode: '94105',
//     description: 'parking spots in a/A classrooms. Lorem ipsum dolor sit amet, error dolores inciderint eu ius, ex wisi vituperata mel. Ut veri everti legendos quo, an audiam epicuri laboramus qui, summo dissentiet ne his. Eum mazim veniam epicurei id. Vis dicit instructior in, vel omnes partem dolorem eu. Duo postea vulputate cu.',
//     vehicle_types: ['truck', 'fullsize'],
//     spot_type: 'open parking',
//     rental_rate: 1000,
//     rental_type: 'daily',
//     img_url: 'truck@truck.com',
//     reservations: [],
//     latitude: 37.798965,
//     longitude: -122.4013603
//   }
// };
// };

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSpot: id => dispatch(fetchSpot(id)),
  clearErrors: () => dispatch(clearErrors()),
  createReservation: (spot_id, data) =>
    dispatch(createReservation(spot_id, data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowSpot);
