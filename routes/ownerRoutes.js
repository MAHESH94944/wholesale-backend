const express = require('express');
const { verifyToken } = require('../middleware/auth');
const ownerController = require('../controllers/ownerController');
const router = express.Router();
const upload = require('../utils/profileMulter');

router.put("/update-profile", verifyToken, upload.single("profileImage"), ownerController.updateProfile);

module.exports = router;