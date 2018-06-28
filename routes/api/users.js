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
// Load input validation
const validateReservationInput = require("../../validation/reservation.js");

// Load Reservation model
const Reservation = require("../../models/Reservation.js");

// @route   GET api/users/test
// @desc    TEsts users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        default: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // Store hash in your password DB.
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched

        const payload = { id: user.id, name: user.email, avatar: user.avatar };

        // Sign Token

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route   POST api/users/spot
// @desc    Add spot to users
// @access  Private

router.post(
  "/spot",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSpotInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    User.findOne({ _id: req.user.id }).then(user => {
      const newSpot = {
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        description: req.body.description,
        vehicle_type: req.body.vehicle_type,
        spot_type: req.body.spot_type,
        rental_rate: req.body.rental_rate,
        rental_type: req.body.rental_type,
        img_url: req.body.img_url
      };
      // Add to spots array
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
        img_url: req.body.img_url
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

/// @route  GET api/users/allspots
// @desc    gets all the spots in the database
// @access  Private

router.get(
  "/allspots",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let allSpots = [];
    User.find()
      .then(users => {
        users.forEach(user => {
          allSpots = allSpots.concat(user.spots);
        });
        res.json(allSpots);
      })
      .catch(err =>
        res.status(404)({ profile: "You messed up something, bro" })
      );
  }
);

/// @route  DELETE api/users/spot
// @desc    delete user vehicles
// @access  Private

router.delete(
  "/spot/:spot_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSpotInput(req.body);

    User.findOne({ _id: req.user.id })
      .then(user => {
        // Get remove index
        const removeIndex = user.spots
          .map(item => item.id)
          .indexOf(req.params.spot_id);

        // Splice out of array
        user.spots.splice(removeIndex, 1);

        // Save
        user.save().then(user => res.json(user));
      })
      .catch(err => res.status(404).json(err));
  }
);

// Vehicles routes

// add a vehicle
// @route   POST api/users/vehicles
// @desc    Add vehicles to users
// @access  Private

router.post(
  "/vehicles",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVehicleInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    User.findOne({ _id: req.user.id }).then(user => {
      const newVehicle = {
        vehicle_type: req.body.vehicle_type,
        plate_no: req.body.plate_no,
        color: req.body.color,
        model: req.body.model,
        year: req.body.year
      };

      // Add to vehicles array
      user.vehicles.unshift(newVehicle);

      user.save().then(user1 => res.json(user1));
    });
  }
);

// delete a vehicle
// @route   POST api/users/vehicles/:id
// @desc    Delete vehicle
// @access  Private

router.delete(
  "/vehicles/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVehicleInput(req.body);

    User.findOne({ _id: req.user.id })
      .then(user => {
        // Get remove index
        const removeIndex = user.vehicles
          .map(item => item.id)
          .indexOf(req.params.vehicle_id);

        // Splice out of array
        user.vehicles.splice(removeIndex, 1);

        // Save
        user.save().then(user1 => res.json(user1));
      })
      .catch(err => res.status(404).json(err));
  }
);

// show a vehicle
// @route   POST api/users/vehicles/:id
// @desc    Show vehicle
// @access  Private

router.get(
  "/vehicles/:vehicle_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    User.findOne({ _id: req.user.id })
      .then(user => {
        // Get vehicle index
        const vehicleIndex = user.vehicles
          .map(item => item.id)
          .indexOf(req.params.vehicle_id);
        res.json(user.vehicles[vehicleIndex]);
      })
      .catch(err =>
        res.status(404).json({ profile: "There is no profile for this user" })
      );
  }
);

// show all vehicles
// @route   POST api/users/vehicles
// @desc    Show all vehicles
// @access  Private

router.get(
  "/vehicles",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    User.findOne({ _id: req.user.id })
      .then(user => {
        res.json(user.vehicles);
      })
      .catch(err =>
        res.status(404).json({ profile: "There is no profile for this user" })
      );
  }
);

//Reservation routes

// @route   GET api/users/spot/spot_id/request
// @desc    Request Reservation
// @access  Public
router.post("/spot/:spot_id/reservations",
passport.authenticate("jwt", { session: false }),
(req, res) => { const { errors, isValid } = validateReservationInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Reservation.findOne({ spot_id: req.params.spot_id }).then(reservation => {

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
