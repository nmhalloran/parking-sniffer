import * as ReservationAPIUtil from '../util/reservation_api_util';

export const RECEIVE_RESERVATIONS = 'RECEIVE_RESERVATIONS';
export const RECEIVE_RESERVATION = 'RECEIVE_RESERVATION';
export const REMOVE_RESERVATION = 'REMOVE_RESERVATION';
export const RECEIVE_RESERVATION_ERRORS = 'RECEIVE_RESERVATION_ERRORS';

const receiveReservations = reservations => ({
    type: RECEIVE_RESERVATIONS,
    reservations
})

const receiveReservation = reservation => ({
    type: RECEIVE_RESERVATION,
    reservation
})

const removeReservation = id => ({
    type: REMOVE_RESERVATION,
    id
})

const receiveErrors = errors => ({
  type: RECEIVE_RESERVATION_ERRORS,
  errors
});

export const fetchReservations = () => dispatch => (
    ReservationAPIUtil.fetchReservations()
        .then(res => dispatch(receiveReservations(res)))
        .catch(err => console.log(err))
)

export const fetchReservation = (id) => dispatch => (
    ReservationAPIUtil.fetchReservation(id)
        .then(res => dispatch(receiveReservation(res)))
        .catch(err => console.log(err))
)

export const createReservation = (spot_id, reservation) => dispatch => (
    ReservationAPIUtil.createReservation(spot_id, reservation)
        .then(res => dispatch(receiveReservation(res)))
        .catch(err => console.log(err))
)

export const deleteReservation = (id) => dispatch => (
    ReservationAPIUtil.deleteReservation(id)
        .then(res => dispatch(removeReservation(res.id)))
        .catch(err => console.log(err))
)