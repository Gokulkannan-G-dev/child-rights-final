const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    case: { type: mongoose.Schema.Types.ObjectId, ref: "Case" },
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    actorLabel: { type: String },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
