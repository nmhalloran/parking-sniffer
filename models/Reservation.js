const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  booking_status: {
    type: String
  },
  vehicle_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  spot_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = Reservation = mongoose.model(
  "reservations",
  ReservationSchema
);
