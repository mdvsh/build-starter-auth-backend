var validator = require("validator");
var isEmpty = require("is-empty");

function reg_val(data) {
  var errors = {};
  var name = !isEmpty(data.name) ? data.name : "";
  var email = !isEmpty(data.email) ? data.email : "";
  var password = !isEmpty(data.password) ? data.password : "";
  if (
    validator.isEmpty(name) ||
    validator.isEmpty(email) ||
    validator.isEmpty(password)
  ) {
    errors.error = "Incomplete fields. Please try again.";
  } else if (!validator.isEmail(email)) {
    errors.error = "Entered email address is not valid.";
  }

  return { errors, isValid: isEmpty(errors) };
}

function login_val(data) {
  var errors = {};
  var email = !isEmpty(data.email) ? data.email : "";
  var password = !isEmpty(data.password) ? data.password : "";
  if (validator.isEmpty(email) || validator.isEmpty(password)) {
    errors.error = "Incomplete Fields. Please try again.";
  } else if (!validator.isEmail(email)) {
    errors.error = "Entered email address is not valid.";
  }
  return { errors, isValid: isEmpty(errors) };
}

module.exports = { reg_val, login_val };
