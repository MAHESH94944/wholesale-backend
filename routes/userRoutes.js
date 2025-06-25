const express = require("express");
const { verifyToken } = require("../middleware/auth");
const userController = require("../controllers/userController");
const router = express.Router();
const upload = require("../utils/profileMulter");

// Get all products for the shop the logged-in customer is registered with
router.get("/shop-products", verifyToken, userController.getShopProducts);

// Get logged-in user's profile (customer only)
router.get("/profile", verifyToken, userController.getProfile);

// Update shopId for logged-in user (customer only)
router.put("/profile/shopid", verifyToken, userController.updateShopId);

// Update profile image for logged-in user (customer only)
router.put(
  "/profile/image",
  verifyToken,
  upload.single("profileImage"),
  userController.updateProfileImage
);

<<<<<<< HEAD
module.exports = router;
=======


module.exports = router;
>>>>>>> b1dc54608a6d4ceaa0732260c10021c07d6968b0
