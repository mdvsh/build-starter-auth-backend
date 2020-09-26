var express = require("express");
var gauthUtils = require("../middleware/gauth_utils");
var queryString = require("query-string");

var router = express.Router();

// send user to sign-in with google
router.get("/verify", async (req, res) => {
  gauthUrl = String(gauthUtils.gauthUrl());
  res.redirect(gauthUrl);
});

router.get("/success", (req, res) => {

});

module.exports = router;
