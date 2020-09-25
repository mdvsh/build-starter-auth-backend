var express = require("express");
var auth = require("../middleware/jwt_auth");
let User = require("../models/User");
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

// more stuff

module.exports = router;
