var validator = require("validator");
var isEmpty = require("is-empty");

function reg_val(data) {
  var reg_errors = {};
  var name = !isEmpty(data.name) ? data.name : "";
  var email = !isEmpty(data.email) ? data.email : "";
  var password = !isEmpty(data.password) ? data.password : "";
  if (validator.isEmpty(name)) {
    reg_errors.name = "Username cannot be empty.";
  }
  if (validator.isEmpty(email)) {
    reg_errors.email = "Email is required.";
  } else if (!validator.isEmail(email)) {
    reg_errors.email = "Entered email address is not valid.";
  }
  if (validator.isEmpty(password)) {
    reg_errors.password = "Password required.";
  }
  return { errors: reg_errors, isValid: isEmpty(reg_errors) };
}

function login_val(data) {
  var login_errors = {};
  var email = !isEmpty(data.email) ? data.email : "";
  var password = !isEmpty(data.password) ? data.password : "";
  if (validator.isEmpty(email)) {
    reg_errors.email = "Email is required.";
  } else if (!validator.isEmail(email)) {
    login_errors.email = "Entered email address is not valid.";
  }
  if (validator.isEmpty(password)) {
    login_errors.password = "Password required.";
  }
  return { errors, isValid: isEmpty(login_errors) };
}

module.exports = { reg_val, login_val };
