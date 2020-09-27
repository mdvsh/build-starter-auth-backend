var express = require("express");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var logger = require("morgan");
var helmet = require("helmet");
var passportSetup = require("./middleware/passport");
var passport = require("passport");
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var cookieSession = require("cookie-session");

// .env config
require("dotenv").config();

var app = express();
app.use(helmet());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.JWT_ACCESS_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

var mongodb_uri = `mongodb+srv://god:${process.env.MONGODB_PSWD}@dweeter-ex4.xkhgv.gcp.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`;
mongoose
  .connect(mongodb_uri, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connection Succesfull."))
  .catch((err) => console.log(err));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.get("/api/test", (req, res) => {
  res.send("bonjour from the backend 🐼");
});
app.use("/auth", authRouter);

module.exports = app;
