const express = require("express");
const path = require("path");
const logger = require("morgan");

const auth = require("./routes/login/login");
const secureRoute = require("./routes/secure-routes");

const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");

const UserModel = require("./model/model");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

mongoose.connect("mongodb://127.0.0.1:27017/passport-jwt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;
require("./auth/auth");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", auth);
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute); //Only verified users can access this.
// app.use("/", indexRouter);
// app.use(
//   "/users",
//   passport.authenticate("jwt", { session: false }),
//   usersRouter
// );

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log("Server started.");
});

module.exports = app;
