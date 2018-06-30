const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const gps = require('gps2zip');
const cities = require('cities');
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateSpotInput = require("../../validation/spot");
const validateVehicleInput = require("../../validation/vehicle");
// Load User model
const User = require("../../models/User.js");

// Function to find distance between two spots by latitude and longitude

function distance(lat1, lon1, lat2, lon2) {
  let radlat1 = (Math.PI * lat1) / 180;
  let radlat2 = (Math.PI * lat2) / 180;
  let theta = lon1 - lon2;
  let radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
}

/// @route  GET api/search/
// @desc    Show user vehicle
// @access  Private

router.get(
  "/",
  // passport.authenticate("jwt", { session: false }) We need to get spots for index page without authentication
  (req, res) => {
    let zip = gps.gps2zip(parseFloat(req.query.latitude), parseFloat(req.query.longitude));
    let range = parseInt(req.query.range)

    let allSpots = [];
    let lat = parseFloat(req.query.latitude);
    let long = parseFloat(req.query.longitude);
    // Gets all users
    User.find()
      .then(users => {
        users.forEach(user => {
          // Creates array of spots
          allSpots = allSpots.concat(user.spots);
        });
        let newSpots = {};
        // Searches and filters spots by geolocation
        allSpots.forEach(spot => {
          if (spot.geometry.coordinates) {
            let point = spot.geometry.coordinates;
            if (distance(lat, long, point[0], point[1]) <= range) {
              newSpots = Object.assign(newSpots, {[spot._id]:spot});
            }
          }
        });
        newSpots = Object.assign(newSpots, {zip:zip.zip_code.toString()},{range:range});
        res.json({spots:newSpots});
      })
      .catch(err =>
        res.status(404)({ profile: "You messed up something, bro" })
      );
  }
);

router.get("/byzip",
// passport.authenticate("jwt", { session: false }) We need to get spots for index page without authentication
(req, res) => {
  let zip = cities.zip_lookup(req.query.zip.toString())
  let range = parseInt(req.query.range)
  //This is how zip looks like (output from cities)
  // { zipcode: '94538',
  // state_abbr: 'CA',
  // latitude: '37.527237',
  // longitude: '-121.96790',
  // city: 'Fremont',
  // state: 'California' }
  let allSpots = [];
  let lat = parseFloat(zip.latitude);
  let long = parseFloat(zip.longitude);
  // Gets all users
  User.find()
    .then(users => {
      users.forEach(user => {
        // Creates array of spots
        allSpots = allSpots.concat(user.spots);
      });
      let newSpots = {};
      // Searches and filters spots by geolocation
      allSpots.forEach(spot => {
        if (spot.geometry.coordinates) {
          let point = spot.geometry.coordinates;
          if (distance(lat, long, point[1], point[0]) <= range) {
            newSpots = Object.assign(newSpots, {[spot._id]:spot});
          }
        }
      });
      newSpots = Object.assign(newSpots, { zip:zip.zipcode.toString() }, {range:range});
      res.json({spots:newSpots});
    })
    .catch(err =>
      res.status(404)({ profile: "You messed up something, bro" })
    );
})

module.exports = router;

// this.lat = 37.798965;
// this.lng = -122.4013603;
