const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const gravatar = require("gravatar");

// Load input validation
const validateReservationInput = require("../../validation/reservation");

// Load Reservation models
const Reservation = require("../../models/Reservation.js");



// @route   POST api/reservations
// @desc    Add reservations
// @access  Private

router.post(
  "/reservations",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateReservationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    User.findOne({ _id: req.user.id }).then(user => {
      const newSpot = {
        address: {
          line1: req.body.line1,
          line2: req.body.line2,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode
        },
        description: req.body.description,
        vehicle_type: req.body.vehicle_type,
        spot_type: req.body.spot_type,
        rental_rate: req.body.rental_rate,
        rental_type: req.body.rental_type,
        img_url: req.body.img_url,
        reservations: []
      };
      // Add to experience array
      user.spots.unshift(newSpot);

      user.save().then(user => res.json(user));
    });
  }
);


// @route  PATCH api/users/spot/:spot_id
// @desc    Update user spot
// @access  Private

router.patch(
  "/spot/:spot_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSpotInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    User.findById({ _id: req.user.id }).then(user => {
      // Add to spots array
      const spotIndex = user.spots
        .map(item => item.id)
        .indexOf(req.params.spot_id);

      const updatedSpot = {
        // _id: req.params.spot_id,
        address: {
          line1: req.body.line1,
          line2: req.body.line2,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode
        },
        description: req.body.description,
        vehicle_type: req.body.vehicle_type,
        spot_type: req.body.spot_type,
        rental_rate: req.body.rental_rate,
        rental_type: req.body.rental_type,
        img_url: req.body.img_url,
        reservations: []
      };
      user.spots[spotIndex] = updatedSpot;

      user.save().then(user => res.json(user));
    });
  }
);

// @route  GET api/users/spot/:spot_id
// @desc    Show user spot
// @access  Private

router.get(
  "/spot/:spot_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSpotInput(req.body);

    User.findOne({ _id: req.user.id }).then(user => {
      const spotIndex = user.spots
        .map(item => item.id)
        .indexOf(req.params.spot_id);

      res.json(user.spots[spotIndex]);
    });
  }
);

/// @route  GET api/users/myspots
// @desc    gets all of a user's vehicles
// @access  Private

router.get(
  "/myspots",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSpotInput(req.body);

    User.findOne({ _id: req.user.id })
      .then(user => {
        res.json(user.spots);
      })
      .catch(err =>
        res.status(404)({ profile: "You messed up something, bro" })
      );
  }
);
