const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String },
    location: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
