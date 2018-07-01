import axios from 'axios';

//createVehicle

export const createVehicle = (vehicle) =>(
  axios({
      method: 'post',
      url: 'api/users/vehicles',
      data: vehicle
  })
);

//deleteVehicle

export const deleteVehicle = (id) => (
    axios({
        method: 'delete',
        url: `/api/users/vehicles/${id}`
    })
);

//fetchVehicle

export const fetchVehicle = (id) => (
    axios({
        method: 'get',
        url: `/api/users/vehicles/${id}`,
    })
);

//fetchVehicles

export const fetchVehicles = () => (
    axios({
        method: 'get',
        url: `/api/users/vehicles`,
    })
);
