const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Vehicle Schema
const VehicleSchema = new Schema({
  vehicle_type: {
    type: String,
    required:true
  },
  plate_no: {
    type: String,
    //unique:true
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
    type: String,
    required: true
  },
  line2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: Number,
    required: true
  },
  geometry: {
    type: {
      type: String,
      default: "Point",
      //unique:true
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
  },
  description: {
    type: String,
    required: true
  },
  vehicle_types: {
    type: [String],
    required: true
  },
  spot_type: {
    type: String,
    required: true
  },
  rental_rate: {
    type: Number,
    required: true
  },
  rental_type: {
    type: String,
    required: true
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
  geometry: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
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
