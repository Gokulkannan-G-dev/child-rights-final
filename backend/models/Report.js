const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    refCode: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["Abuse", "Neglect", "Child labor", "Educational issue", "Exploitation", "Other"],
      required: true
    },
    urgency: { type: String, enum: ["urgent", "standard"], default: "standard" },
    description: { type: String, required: true },
    childAge: { type: String },
    location: { type: String },
    isAnonymous: { type: Boolean, default: true },
    contact: {
      name: { type: String },
      phone: { type: String },
      email: { type: String }
    },
    attachments: [
      {
        originalName: String,
        storedPath: String,
        uploadedAt: { type: Date, default: Date.now }
      }
    ],
    language: { type: String, default: "en" },
    case: { type: mongoose.Schema.Types.ObjectId, ref: "Case" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
