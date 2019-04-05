const express = require("express");
const sha256 = require("sha-256-js");
//const sqlite3 = require('sqlite3').verbose()
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const port = 3000;
const cookieSession = require("cookie-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const sqlite = require('./config/sqlite');
sqlite.sqliteConnect()
require("./auth/auth");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// morgan is used to give OPTIONS and POST information about the req
// app.use(morgan('combined'))

// CORS (Cross-Origin Resource Sharing). Used for running 2 separate apps?
app.use(
  cors({
    origin: "*"
  })
);

app.use("/", require("./routes/routes"));
app.use("/", require("./routes/secure.routes"));
app.use(
  cookieSession({
    name: "mysession",
    keys: ["vueauthrandomkey"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);


app.get("/logout", function(req, res) {
  console.log("logged out");
  return res.send();
});

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));