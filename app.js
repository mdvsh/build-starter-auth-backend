var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var cors = require("cors");
const { Console } = require("console");
var logger = require("morgan");
var helmet = require("helmet");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var gauthRouter = require("./routes/gauth")

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

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/gauth", gauthRouter); 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
