const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["Article", "Video", "Infographic"], default: "Article" },
    icon: { type: String },
    meta: { type: String },
    region: { type: String, default: "National" },
    body: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
