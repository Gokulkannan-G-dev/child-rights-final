const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "General" },
    region: { type: String, default: "National" },
    description: { type: String },
    contact: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
