const express = require("express");
const router = express.Router();
// const gravatar = require("gravatar");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");
// const passport = require("passport");

// // Load input validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");
// const validateSpotInput = require("../../validation/spot");
// const validateVehicleInput = require("../../validation/vehicle");
// // Load User model
// const User = require("../../models/User.js");
// const Reservation = require("../../models/Reservation.js");
// // const Reservation = require("../../models/Reservation.js");

router.get("/test", (req, res) => res.json({ msg: "Test Works" }));

module.exports = router;
