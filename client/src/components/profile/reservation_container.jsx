// import { connect } from "react-redux";
// import React from "react";

// import {
//   fetchReservations,
//   updateReservation,
//   deleteReservation
// } from "../../actions/reservation_actions";
// import SpotsIndexItem from "./spots_index_item";

// const mapStateToProps = (state, ownProps) => {
//   debugger;
//   return {
//     reservations: state.entities.reservations,
//     currentUser: state.isAuthenticated.user
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   fetchReservations: () => dispatch(fetchReservations()),
//   updateReservation: (spot_id, reservation) =>
//     dispatch(updateReservation(spot_id, reservation)),
//   deleteReservation: id => dispatch(deleteReservation(id))
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SpotsIndexItem);
