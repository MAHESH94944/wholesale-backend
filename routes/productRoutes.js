const express = require("express");
const { verifyToken } = require("../middleware/auth");
const productController = require("../controllers/productController");
const router = express.Router();
const upload = require("../utils/productMulter");

router.post(
  "/",
  verifyToken,
  upload.single("image"),
  productController.createProduct
);

// Get all products for the logged-in owner
router.get("/", verifyToken, productController.getMyProducts);

// Get all products (public)
router.get("/all", productController.getAllProducts);


module.exports = router;
