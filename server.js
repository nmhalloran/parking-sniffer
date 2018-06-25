const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config

const db = require("./config/keys").mongoURI;

// Connect to  MongoDB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

<<<<<<< HEAD
app.get("/", (req, res) => res.sendFile(__dirname + '/client/public/index.html'));
=======
  console.log(__dirname);
app.get("/", (req, res) => res.sendFile((__dirname+'/map.html')));
>>>>>>> 80ce47515be594d27cb7849f85dfe9b17c5ae8e6
// Passport Middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
