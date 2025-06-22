const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DEFAULT_PROFILE_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "salesman", "owner"],
    required: true,
  },
  shopId: {
    type: String,
    required: function () {
      return this.role === "owner" || this.role === "customer";
    },
  },
  shopName: { type: String }, // required only for owner
  shopType: {
    type: String,
    enum: ["RetailPackStore", "BulkRationStore"],
    required: function () {
      return this.role === "owner";
    },
  },
  address: {
    type: String,
    required: function () {
      return this.role === "owner";
    },
  },
  enterpriseName: {
    type: String,
    required: function () {
      return this.role === "salesman";
    },
  },
  phoneNumber: {
    type: Number,
    isVisible: false,
    default: 0,
    maxLength: 10,
  },
  googleId: String,
  profileImage: { type: String, default: DEFAULT_PROFILE_IMAGE },
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


module.exports = mongoose.model("User", userSchema);
