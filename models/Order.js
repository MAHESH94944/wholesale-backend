const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  status: {
    type: String,
    enum: ["pending", "packed", "collected"],
    default: "pending",
  },
  slot: { type: mongoose.Schema.Types.ObjectId, ref: "Slot" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
