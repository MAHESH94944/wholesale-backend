const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

dotenv.config();
require("./config/passport")();

const authRoutes = require("./routes/authRoutes");
// ...require other route files as implemented...;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
// ...mount other routes...

app.get("/", (req, res) => {
  res.send("Smart Wholesale Shop API is running.");
});

app.use(errorHandler);

module.exports = app;
