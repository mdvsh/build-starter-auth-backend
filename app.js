var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var cors = require("cors");
const { Console } = require("console");
var logger = require("morgan");
var helmet = require("helmet");
var passport = require("./middleware/passport")
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");

// .env config
require("dotenv").config();

var app = express();
app.use(helmet());

// database setup

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
app.use("/auth", authRouter);

module.exports = app;
