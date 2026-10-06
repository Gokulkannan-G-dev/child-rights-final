const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    report: { type: mongoose.Schema.Types.ObjectId, ref: "Report", required: true },
    refCode: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Under Review", "Escalated", "Resolved", "Closed"],
      default: "Pending"
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    escalatedTo: {
      organizationName: String,
      note: String,
      escalatedAt: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);
