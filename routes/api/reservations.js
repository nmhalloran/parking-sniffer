const express = require("express");
const router = express.Router();

// Load input validation
const validateReservationInput = require("../../validation/reservation.js");

// Load Reservation model
const Reservation = require("../../models/Reservation.js");

// @route   GET api/reservations/test
// @desc    Tests reservations route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Reservation Works" }));

// @route   GET api/reservations/request
// @desc    Request Reservation
// @access  Public
router.post("/request", (req, res) => {
  const { errors, isValid } = validateReservationInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Reservation.findOne({ spot_id: req.body.spot_id }).then(reservation => {

      const newReservation = new Reservation({
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        booking_status: req.body.booking_status,
        vehicle_id: req.body.vehicle_id,
        spot_id: req.body.spot_id,
        parker_id: req.body.parker_id,
        seller_id: req.body.seller_id,
      });
      newReservation
        .save()
        .then(reservation1 => res.json(reservation1))
        .catch(err => console.log(err));
  });
});
module.exports = router;
