const express = require('express');
const { verifyToken } = require('../middleware/auth');
const salesmanController = require('../controllers/salesmanController');
const router = express.Router();
const upload = require('../utils/profileMulter');

router.put("/update-profile", verifyToken, upload.single("profileImage"), salesmanController.updateProfile
);

module.exports = router;