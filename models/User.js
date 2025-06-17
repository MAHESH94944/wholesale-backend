const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "salesman", "owner"],
    required: true,
  },
  shopId: { type: String, required: true },
  shopName: { type: String }, // required only for owner
  shopType: {
    type: String,
    enum: ["RetailPackStore", "BulkRationStore"],
    required: function () {
      return this.role === "owner";
    },
  },
  googleId: String,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);
