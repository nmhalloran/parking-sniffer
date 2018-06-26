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

// @route   POST api/profile/experience
// @desc    Add experience to profile
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

    User.findOne({ user: req.id }).then(user => {
      const newSpot = {
        // address: {
        //   line1: req.body.address.line1,
        //   line2: req.body.address.lin2,
        //   city: req.body.address.city,
        //   state: req.body.address.state,
        //   zipcode: req.body.address.zipcode
        // },
        description: req.body.description
        // vehicle_types: req.body.vehicle_types,
        // spot_type: req.body.spot_type,
        // rental_rate: req.body.rental_rate,
        // rental_type: req.body.rental_type,
        // img_url: req.body.img_url,
        // reservations: []
      };

      // Add to experience array
      user.spots.unshift(newSpot);

      user.save().then(user1 => res.json(user1));
    });
  }
);



// Vehicles routes

// add a vehicle
// @route   POST api/users/vehicles
// @desc    Add vehicles to users
// @access  Private

router.post(
  "/vehicle",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVehicleInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    User.findOne({ user: req.id }).then(user => {
      const newVehicle = {

        vehicle_types: req.body.vehicle_types,
        plate_no: req.body.plate_no,
        color: req.body.color,
        model: req.body.model,
        year: req.body.year,
        reservations: []

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
  "/vehicle/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateVehicleInput(req.body);

    User.findOne({ user: req.id })
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


//show
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

//index


module.exports = router;
