var express = require("express");
var auth = require("../middleware/jwt_auth");
var jwt = require("jsonwebtoken");
var { reg_val, login_val } = require("../middleware/validation");
const User = require("../models/User");

var router = express.Router();

// get user details
router.get("/", auth, async (req, res) => {
  try {
    var user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).send({ error: "The said user doesn't exist." });
    }
    var data = {
      name: user.name,
      email: user.email,
      timestamp: user.timestamp,
    };
    return res.status(200).send({ user: data });
  } catch (err) {
    console.log(`An error occurred: ${err.message}`);
    res.status(404).send({ error: "An Error Occured." });
  }
});

// register new user
router.post("/", async (req, res) => {
  try {
    // validation
    var { errors, isValid } = reg_val(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        // already exists
        return res
          .status(400)
          .send({ error: "User with this email already exists." });
      } else {
        var new_user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        new_user.save();
        var token = jwt.sign(
          { _id: new_user._id },
          process.env.JWT_ACCESS_KEY,
          {
            expiresIn: "1h",
          }
        );
        var new_userInfo = {
          name: new_user.name,
          email: new_user.email,
        };
        res.status(200).send({ user: new_userInfo, token });
      }
    });
  } catch (err) {
    console.log(`An error occurred: ${err.message}`);
    res.status(400).send({ error: "Something didn't happen as expected" });
  }
});

module.exports = router;
