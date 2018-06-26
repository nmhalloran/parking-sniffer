const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVehicleInput(data) {
  let errors = {};

  data.vehicle_type = !isEmpty(data.vehicle_type) ? data.vehicle_type : "";
  data.plate_no = !isEmpty(data.plate_no) ? data.plate_no : "";
  data.color = !isEmpty(data.color) ? data.color : "";
  data.model = !isEmpty(data.model) ? data.model : "";
  data.year = !isEmpty(data.year) ? data.year : "";


  if (Validator.isEmpty(data.vehicle_type)) {
    errors.vehicle_type = "Enter in a vehicle_type!";
  }
  if (Validator.isEmpty(data.plate_no)) {
    errors.plate_no = "Enter in a plate_no!";
  }
  if (Validator.isEmpty(data.color)) {
    errors.color = "Enter in a color!";
  }
  if (Validator.isEmpty(data.model)) {
    errors.model = "Enter in a model!";
  }
  if (Validator.isEmpty(data.year)) {
    errors.year = "Enter in a year!";
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
