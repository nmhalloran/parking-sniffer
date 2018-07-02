import axios from 'axios';

export const fetchCurrentUser = () => (
    axios({
        method: 'get',
        url: `/api/users/current`,
    })
);
