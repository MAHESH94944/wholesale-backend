const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");

// Update profile for the logged-in owner
exports.updateProfile = async (req, res) => {
  try {
        const { name, password, shopName, address, phoneNumber, phIsVisible } = req.body;
        let user = await User.findById(req.user.id);
        
        if (!user || user.role !== "owner") {
            return res.status(403).json({ message: "Only owners can update profile." });
        };

        let imageBase64;
        let imageMime;

        if (req.file) {
        // Convert image to base64
            imageBase64 = req.file.buffer.toString("base64");
            imageMime = req.file.mimetype;
        }

        let hashedPassword = user.password;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const updatedUser = {
            profileImage : `data:${imageMime};base64,${imageBase64}` || user.profileImage,
            name: name || user.name,
            password: hashedPassword,
            shopName: shopName || user.shopName,
            address: address || user.address,
            phoneNumber: phoneNumber || user.phoneNumber,
            phIsVisible: phIsVisible || false
        };

        user = Object.assign(user, updatedUser);
        await user.save();
        res.json({ message: "Profile updated successfully.", user});
    } 
    catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ message: "Failed to update profile." });
    }
}