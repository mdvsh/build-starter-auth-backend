var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var bcryptjs = require("bcryptjs");
var validator = require("validator");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: {  
    type: String,
    required: true,
    unique: true,
    validate: (mail) => {
      if (!validator.isEmail(mail)) {
        throw new Error({
          error: "Entered email address is not valid.",
        });
      }
    },
  },
  password: { type: String },
  gauth_token: { type: String },
  timestamp: { type: String, default: new Date().getTime() },
});

userSchema.pre("save", async function (next) {
  var user = this;
  if (!user.gauth_token) {
    if (user.isModified("password")) {
      user.password = await bcryptjs.hash(user.password, 16);
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
