import axios from "axios";

export const fetchReservations = spot_id =>
  axios({
    method: "get",
    url: `api/users/spot/${spot_id}/reservations`
  });

export const fetchReservation = (id, spot_id) =>
  axios({
    method: "get",
    url: `api/users/spot/${spot_id}/reservations/${id}`
  });

export const createReservation = (spot_id, reservation) =>
  axios({
    method: "post",
    url: `api/users/spot/${spot_id}/reservations`,
    data: reservation
  });

export const updateReservation = (spot_id, reservation) =>
  axios({
    method: "patch",
    url: `api/users/spot/${spot_id}/reservations`,
    data: reservation
  });

export const deleteReservation = id =>
  axios({
    method: "delete",
    url: `api/users/spot/:spot_id/reservations/${id}`
  });
