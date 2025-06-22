const User = require("../models/User");
const Product = require("../models/Product");

// Get all products for the shop the logged-in customer is registered with
exports.getShopProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "customer" || !user.shopId) {
      return res
        .status(403)
        .json({ message: "Only customers can view their shop's products." });
    }
    // Find the owner of the shop
    const shopOwner = await User.findOne({
      shopId: user.shopId,
      role: "owner",
    });
    if (!shopOwner) {
      return res.status(404).json({ message: "Shop not found." });
    }
    // Get all products for this shop owner
    const products = await Product.find({ owner: shopOwner._id });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch shop products." });
  }
};

// Get logged-in user's profile (customer only)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customers can view profile." });
    }
    res.json({
      name: user.name,
      email: user.email,
      shopId: user.shopId,
      profileImage: user.profileImage || null,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile." });
  }
};

// Update shopId for logged-in user (customer only)
exports.updateShopId = async (req, res) => {
  try {
    const { shopId } = req.body;
    if (!shopId) {
      return res.status(400).json({ message: "shopId is required." });
    }
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customers can update shopId." });
    }
    // Check if shopId exists (must be an owner)
    const shopOwner = await User.findOne({ shopId, role: "owner" });
    if (!shopOwner) {
      return res.status(400).json({ message: "Shop ID doesn't exist." });
    }
    user.shopId = shopId;
    await user.save();
    res.json({ message: "Shop ID updated successfully.", shopId: user.shopId });
  } catch (err) {
    res.status(500).json({ message: "Failed to update shopId." });
  }
};

// Update profile image for logged-in user (customer only)
exports.updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "customer") {
      return res
        .status(403)
        .json({ message: "Only customers can update profile image." });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required." });
    }
    // Convert image to base64
    const imageBase64 = req.file.buffer.toString("base64");
    const imageMime = req.file.mimetype;
    user.profileImage = `data:${imageMime};base64,${imageBase64}`;
    await user.save();
    res.json({
      message: "Profile image updated successfully.",
      profileImage: user.profileImage,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile image." });
  }
};

