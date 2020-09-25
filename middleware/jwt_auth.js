const jwt = require("jsonwebtoken");

module.exports = function jwt_auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, result) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.user = result;
      next();
    });
  } else {
    return res.status(401).send({ error: "Invalid JWT Token." }); // invalid token
  }
}
