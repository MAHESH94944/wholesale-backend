const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");

// Update profile for the logged-in owner
exports.updateProfile = async (req, res) => {
  try {
        const { name, email, password, shopName, address, phoneNumber, phIsVisible } = req.body;
        let user = await User.findById(req.user.id);
        
        if (!user || user.role !== "owner") {
            return res.status(403).json({ message: "Only owners can update profile." });
        }

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
            profileImage: imageMime && imageBase64 ? `data:${imageMime};base64,${imageBase64}` : user.profileImage,
            name: name || user.name,
            email: email || user.email,
            password: hashedPassword,
            shopName: shopName || user.shopName,
            address: address || user.address,
            phoneNumber: phoneNumber || user.phoneNumber,
            phIsVisible: typeof phIsVisible === "boolean" ? phIsVisible : user.phIsVisible
        };

        user.set(updatedUser);
        await user.save();
        res.json({ message: "Profile updated successfully.", user});
    } 
    catch (err) {
        console.error(`Error updating profile for user ID: ${req.user && req.user.id ? req.user.id : 'unknown'}`, err);
        res.status(500).json({ message: "Failed to update profile." });
    }
}