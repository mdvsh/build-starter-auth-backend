var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'express' });
  res.send("a build starter auth backend with jwt+google 😳");
});

module.exports = router;
