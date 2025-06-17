const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Smart Wholesale Shop API is running.");
});

app.use(errorHandler);

module.exports = app;

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
// ...mount other routes...

app.get("/", (req, res) => {
  res.send("Smart Wholesale Shop API is running.");
});

app.use(errorHandler);

module.exports = app;
