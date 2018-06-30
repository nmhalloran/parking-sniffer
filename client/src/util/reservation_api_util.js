import axios from 'axios';

export const fetchReservations = () => (
    axios({
        method: 'get',
        url: 'api/users/spot/:spot_id/reservations',
    })
)

export const fetchReservation = (id) => (
    axios({
        method: 'get',
        url: `api/users/spot/:spot_id/reservations/${id}`
    })
)

export const createReservation = (reservation) => (
    axios({
        method: 'post',
        url: 'api/users/spot/:spot_id/reservations',
        data: reservation
    })
)

export const deleteReservation = (id) => (
    axios({
        method: 'delete',
        url: `api/users/spot/:spot_id/reservations/${id}`
    })   
)