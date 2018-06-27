const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const gravatar = require("gravatar");
const mongoose = require("mongoose");

// Load input validation
const validateReservationInput = require("../../validation/reservation");

// Load Reservation models
const Reservation = require("../../models/Reservation.js");

// @route   GET api/reservations/test
// @desc    TEsts reservations route
// @access  Public
router.get("/test",passport.authenticate("jwt", { session: false }),
(req, res) => res.json({ msg: "Reservations Works" }));

// @route   POST api/reservations
// @desc    Add reservations
// @access  Private

router.post(
  "/request",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateReservationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Reservation.findOne({ spot_id: req.spot_id }).then(reservation => {

      const newReservation = {
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        booking_status: req.body.booking_status,
        vehicle_id: req.body.vehicle_id,
        spot_id: req.body.spot_id,
        parker_id: req.body.parker_id,
        seller_id: req.body.seller_id,
      };
      // Add to experience array
      reservation.unshift(newReservation);

      reservation.save().then(reserve => res.json(reserve));
    });
  }
);

module.exports = router;
