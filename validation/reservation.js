const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateReservationInput(data) {
  let errors = {};

  data.start_date = !isEmpty(data.start_date) ? data.start_date : "";
  data.end_date = !isEmpty(data.end_date) ? data.end_date : "";
  data.booking_status = !isEmpty(data.booking_status) ? data.booking_status : "";
  data.vehicle_id = !isEmpty(data.vehicle_id) ? data.vehicle_id : "";
  data.spot_id = !isEmpty(data.spot_id) ? data.spot_id : "";
  data.parker_id = !isEmpty(data.parker_id) ? data.parker_id : "";
  data.seller_id = !isEmpty(data.seller_id) ? data.seller_id : "";

  const status = ["approved","pending","denied"];
  
  if (Validator.isEmpty(data.start_date)) {
    errors.start_date = "Enter in a start_date!";
  }
  if (Validator.isEmpty(data.end_date)) {
    errors.end_date = "Enter in a end_date!";
  }
  if (Validator.isEmpty(data.booking_status)) {
    errors.booking_status = "Enter in a booking_status!";
  }
  if (Validator.isEmpty(data.vehicle_id)) {
    errors.vehicle_id = "Enter in a vehicle_id!";
  }
  if (Validator.isEmpty(data.spot_id)) {
    errors.spot_id = "Enter in a spot_id!";
  }
  if (Validator.isEmpty(data.parker_id)) {
    errors.parker_id = "Enter in a parker_id!";
  }
  if (Validator.isEmpty(data.seller_id)) {
    errors.seller_id = "Enter in a seller_id!";
  }
  if (!status.includes(data.booking_status)) {
    errors.booking_status = "Not a valid booking status!";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
