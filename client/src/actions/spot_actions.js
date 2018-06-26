import * as SpotAPIUtil from '../util/spot_api_util';

export const RECEIVE_SPOTS = 'RECEIVE_SPOTS';
export const RECEIVE_SPOT = 'RECEIVE_SPOT';
export const REMOVE_SPOT = 'REMOVE_SPOT';
export const RECEIVE_SPOT_ERRORS = 'RECEIVE_SPOT_ERRORS';

const receiveSpots = spots => ({
    type: RECEIVE_SPOTS,
    spots
})

const receiveSpot = spot => ({
    type: RECEIVE_SPOT,
    spot
})

const removeSpot = (id) => ({
    type: REMOVE_SPOT,
    id
})

const receiveErrors = errors => ({
    type: RECEIVE_SPOT_ERRORS,
    errors
})

export const fetchSpots = () => dispatch => (
    SpotAPIUtil.fetchSpots()
        .then(spots => dispatch(receiveSpots(spots)))
        .catch(err => console.log(err)) //deal with errors later
)

export const fetchSpot = (id) => dispatch => (
    SpotAPIUtil.fetchSpot(id)
        .then(spot => dispatch(receiveSpot(spot)))
        .catch(err => console.log(err))
)

export const createSpot = (spot) => dispatch => (
    SpotAPIUtil.createSpot(spot)
        .then(spotRes => dispatch(receiveSpot(spotRes)))
        .catch(err => console.log(err))
)

export const updateSpot = (spot) => dispatch => (
    SpotAPIUtil.updateSpot(spot)
        .then(spotRes => dispatch(receiveSpot(spotRes)))
        .catch(err => console.log(err))
)

export const deleteSpot = (id) => dispatch => (
    SpotAPIUtil.deleteSpot(id)
        .then(res => dispatch(removeSpot(res.id)))
        .catch(err => console.log(err))
)