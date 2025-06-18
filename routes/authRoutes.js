const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  const { name, email, password, role, shopId, shopName, shopType, address } =
    req.body;
  try {
    if (!name || !email || !password || !role || !shopId) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (!["customer", "salesman", "owner"].includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    // Owner registration
    if (role === "owner") {
      if (!shopName) {
        return res
          .status(400)
          .json({ message: "shopName is required for owner." });
      }
      if (
        !shopType ||
        !["RetailPackStore", "BulkRationStore"].includes(shopType)
      ) {
        return res.status(400).json({
          message:
            "shopType is required for owner and must be either 'RetailPackStore' or 'BulkRationStore'.",
        });
      }
      if (!address) {
        return res
          .status(400)
          .json({ message: "address is required for owner." });
      }
      const existingShop = await User.findOne({ shopId, role: "owner" });
      if (existingShop) {
        return res.status(400).json({ message: "Shop ID already exists." });
      }
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already registered." });
      }
      const owner = await User.create({
        name,
        email,
        password,
        role,
        shopId,
        shopName,
        shopType,
        address,
      });
      return res
        .status(201)
        .json({ message: "Owner registered successfully." });
    }

    // Customer or Salesman registration
    const shopOwner = await User.findOne({ shopId, role: "owner" });
    if (!shopOwner) {
      return res
        .status(400)
        .json({ message: "Invalid shop ID – shop not found." });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered." });
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
      shopId,
      shopName: shopOwner.shopName,
    });
    return res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed." });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, shopId: user.shopId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    if (role === "owner") {
      return res.json({
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          shopId: user.shopId,
          shopName: user.shopName,
          shopType: user.shopType,
          address: user.address,
        },
      });
    } else {
      // customer or salesman
      const shopOwner = await User.findOne({
        shopId: user.shopId,
        role: "owner",
      });
      return res.json({
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          shopId: user.shopId,
          shopName: shopOwner ? shopOwner.shopName : "",
          shopType: shopOwner ? shopOwner.shopType : "",
          address: shopOwner ? shopOwner.address : "",
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ message: "Login failed." });
  }
});

module.exports = router;
