const express = require("express");
const path = require("path");
const logger = require("morgan");
const express = require("express");
require("./login");
const auth = require("./routes/auth");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
app.use("/auth", auth);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter
);

module.exports = app;
