const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // base64 string (data URL)
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // percentage or amount
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // reference to owner
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
