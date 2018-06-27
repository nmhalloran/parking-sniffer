const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSpotInput(data) {
  let errors = {};

  data.description = !isEmpty(data.description) ? data.description : "";
  // data.password = !isEmpty(data.password) ? data.password : "";

  // if (!Validator.isEmail(data.email)) {
  //     errors.email = "Email is invalid";
  // }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Enter in a description!";
  }

  // if (Validator.isEmpty(data.password)) {
  //     errors.password = "Password field is required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
