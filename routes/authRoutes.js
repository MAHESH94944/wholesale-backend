const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const { register, login } = require("../controllers/authController");
// Registration route
router.post("/register", register);
// Login route
router.post("/login", login);

module.exports = router;
