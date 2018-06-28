const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

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
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let allSpots = [];
    let lat = req.query.latitude;
    let long = req.query.longitude;
    // Gets all users
    User.find()
      .then(users => {
        users.forEach(user => {
          // Creates array of spots
          allSpots = allSpots.concat(user.spots);
        });
        let newSpots = [];
        // Searches and filters spots by geolocation
        allSpots.forEach(spot => {
          if (spot.geometry.coordinates) {
            let point = spot.geometry.coordinates;
            if (distance(lat, long, point[0], point[1]) <= 200) {
              newSpots.push(spot);
            }
          }
        });
        res.json(newSpots);
      })
      .catch(err =>
        res.status(404)({ profile: "You messed up something, bro" })
      );
  }
);

module.exports = router;

// this.lat = 37.798965;
// this.lng = -122.4013603;
