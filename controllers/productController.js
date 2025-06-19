const Product = require("../models/Product");
const User = require("../models/User");

// Create product (owner only)
exports.createProduct = async (req, res) => {
  try {
    const { title, price, discount, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required and must be a valid file upload.",
      });
    }
    if (!price) {
      return res.status(400).json({ message: "Price is required." });
    }
    const owner = await User.findById(req.user.id);
    if (!owner || owner.role !== "owner") {
      return res
        .status(403)
        .json({ message: "Only owner can create products." });
    }
    const imageBase64 = req.file.buffer.toString("base64");
    const imageMime = req.file.mimetype;

    const product = await Product.create({
      title,
      image: `data:${imageMime};base64,${imageBase64}`,
      price,
      discount,
      description,
      owner: owner._id,
    });
    res.status(201).json({ message: "Product created successfully.", product });
  } catch (err) {
    res.status(500).json({ message: "Product creation failed." });
  }
};

// Get all products for the logged-in owner
exports.getMyProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "owner") {
      return res
        .status(403)
        .json({ message: "Only owner can view their products." });
    }
    const products = await Product.find({ owner: user._id });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

// Get all products (public)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products." });
  }
};
