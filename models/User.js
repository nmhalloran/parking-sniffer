const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Vehicle Schema
const VehicleSchema = new Schema({
  vehicle_type: {
    type: String
  },
  plate_no: {
    type: String
  },
  color: {
    type: String
  },
  model: {
    type: String
  },
  year: {
    type: Number
  }
});

// Create Spot Schema
const SpotSchema = new Schema({

  line1: {
    type: String
  },
  line2: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipcode: {
    type: Number
  },
  description: {
    type: String
  },
  vehicle_types: {
    type: [String]
  },
  spot_type: {
    type: String
  },
  rental_rate: {
    type: Number
  },
  rental_type: {
    type: String
  },
  img_url: {
    type: String
  }
});

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  profile: {
    bio: {
      type: String
    }
  },

  spots: [SpotSchema],

  vehicles: [VehicleSchema]

});

module.exports = User = mongoose.model("users", UserSchema);
