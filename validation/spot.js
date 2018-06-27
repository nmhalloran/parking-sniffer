const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSpotInput(data) {
  let errors = {};

  data.line1= !isEmpty(data.line1) ? data.line1 : "";
  data.line2 = !isEmpty(data.line2) ? data.line2 : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.vehicle_types = !isEmpty(data.vehicle_types) ? data.vehicle_types : "";
  data.spot_type = !isEmpty(data.spot_type) ? data.spot_type : "";
  data.rental_rate = !isEmpty(data.rental_rate) ? data.rental_rate : "";
  data.rental_type = !isEmpty(data.rental_type) ? data.rental_type : "";
  data.img_url = !isEmpty(data.img_url) ? data.img_url : "";
  data.location = !isEmpty(data.location) ? data.location : "";


  if (Validator.isEmpty(data.line1)) {
    errors.line1 = "Enter in a line1!";
  }
  if (Validator.isEmpty(data.line2)) {
    errors.line2 = "Enter in a line2!";
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = "Enter in a city!";
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = "Enter in a state!";
  }
  if (Validator.isEmpty(data.zipcode)) {
    errors.zipcode = "Enter in a zipcode!";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Enter in a description!";
  }
  if (Validator.isEmpty(data.vehicle_types)) {
    errors.vehicle_types = "Enter in a vehicle_types!";
  }
  if (Validator.isEmpty(data.spot_type)) {
    errors.spot_type = "Enter in a spot_type!";
  }
  if (Validator.isEmpty(data.rental_rate)) {
    errors.rental_rate = "Enter in a rental_rate!";
  }
  if (Validator.isEmpty(data.rental_type)) {
    errors.rental_type = "Enter in a rental_type!";
  }
  if (Validator.isEmpty(data.img_url )) {
    errors.img_url  = "Enter in a img_url !";
  }
  if (Validator.isEmpty(data.location )) {
    errors.location  = "Enter in a location !";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
