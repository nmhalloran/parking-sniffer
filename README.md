# Parking Sniffer

Parking Sniffer is a project aiming to create a peer to peer parking space network to solve the issue of limited parking space in major cities.


### [Live Page Here](https://stormy-everglades-86966.herokuapp.com/#/)

## Table of Contents

* [Background And Overview](https://github.com/nmhalloran/parking-sniffer#background-and-overview)
* [Technologies](https://github.com/nmhalloran/parking-sniffer#technologies)
* [Features](https://github.com/nmhalloran/parking-sniffer#features)
* [MERN Stack - User Authentication](https://github.com/nmhalloran/parking-sniffer#mern-stack---user-authentication)
* [Functionality and MVP](https://github.com/nmhalloran/parking-sniffer#functionality-and-mvp)
* [Bonus Features](https://github.com/nmhalloran/parking-sniffer#bonus-features)

## Background And Overview

A person to person parking app that connects users in an area that need parking, with the users in an area offering parking. App utilizes Google Maps API to allow searches in a set area. Owners of parking spaces set their own price and set restrictions on type of car and range of stay.

## Technologies

* MERN Stack: (Mongo, Express.js, React, Node.js)
* Google MAPS API  

## Features

* Parking Sniffer Landing Page
![](https://s6.postimg.cc/fq2p6lbpt/parking_sniffer_1.png)


* While logged in or out, anyone can search for nearby parking spots by inputting a zipcode and search distance. Users   are then required to log in if they want to access further features - such as renting out their spots to users,        storing their vehicle information, and creating parking reservations.
![](https://s6.postimg.cc/kww87cm0h/search_spot_index.png)


* When logged in, a user's personal dashboard displays the parking spots they want to rent out and their current         vehicle information. They can create more of these by clicking the links on the right side.
![](https://s6.postimg.cc/koq7l3sdd/user_profile.png)


* Want to lease your parking spot to others? Great! Just fill up this form and nearby renters will see your parking      information. Fill in your address and click on the map to pinpoint exactly where your parking spot is. Use the         Googlemaps satellite feature to show terrain details.
![](https://s6.postimg.cc/nqzdkyo8h/create_spot_form.png)


* Did you find the parking spot you wanted to rent for.. a few days? weeks? months? Clicking on a specific parking       spot will show you more of its information and you can book your reservation on the same page as well.
![](https://s6.postimg.cc/4ynihdk4h/show_spot_page_and_reservation.png)


## MERN Stack - User Authentication

We used MongoDB and Express for our Backend Database and User Authentication. The syntax and architecture is much different compared to a Ruby on Rails, User Auth. For example, instead of having session controllers and utils, we used the following:

### Set Auth Token (comparable to auth_util)
``` JS
import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {

    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
```

### Auth Actions
``` JS
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// sets current user
export const setCurrentUser = decoded => ({
    type: SET_CURRENT_USER,
    payload: decoded
});

// signs up user
export const createUser = (user, history) => dispatch => {
    axios
      .post('/api/users/register', user) // method, url, and data
      .then(res => (history.push('/signin')))
      .catch(error => dispatch({
          type: ADD_ERRORS,
          payload: error.response.data
        })
      );
};

// logs in user
export const loginUser = (user) => dispatch => {
    axios
      .post('/api/users/login', user)
      .then(res => {
        //save to local storage
        const { token } = res.data;
        // set token to local storage
        localStorage.setItem('jwtToken', token);
        // set token to auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(error => dispatch({
        type: ADD_ERRORS,
        payload: error.response.data
        })
      );
}
// log out user
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};

```

## Functionality And MVP

- [X] User authentication and validation. Users are both renters and sellers.  
- [X] Creating a property . Sellers will be able to publish details about their properties and also be able to set restrictions pertaining to the usage
- [X] Search - utilizes Google Maps and integrates with our API for targeted search anywhere in the US.
- [X] Renters will be able to filter and select parking spaces through the search and rent parking spaces according to their needs.
- [X] The application will be seeded with data and deployed in heroku.

## Bonus Features

- [ ] Seller property authentication.
- [ ] Direction to sellers location though maps .
- [ ] Add boat spaces to type of property and allow renters to rent boat spaces for boats.
