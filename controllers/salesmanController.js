const User = require("../models/User");
const Product = require("../models/Product");

module.exports.updateProfile = async (req, res) => {    
    try {
        const { name, password, address, enterpriseName } = req.body;
        const user = await User.findById(req.user.id);
        const userId = req.user.id;

        if (!user || user.role !== "salesman") {
            return res.status(403).json({ message: "Only salesman can update profile." });
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
    
        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            profileImage : `data:${imageMime};base64,${imageBase64}` || user.profileImage,
            name: name || user.name,
            password: hashedPassword || user.password,
            address: address || user.address,
            enterpriseName: enterpriseName || user.enterpriseName
        },
        { new: true }
        );
    
        res.status(200).json({
        message: "Profile updated successfully.",
        user: updatedUser,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}