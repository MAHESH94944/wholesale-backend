const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // e.g., "10:00"
  endTime: { type: String, required: true }, // e.g., "10:30"
  isBooked: { type: Boolean, default: false },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["customer", "salesman"], required: true },
});

module.exports = mongoose.model("Slot", slotSchema);
