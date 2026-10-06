const mongoose = require("mongoose");

const internalNoteSchema = new mongoose.Schema(
  {
    case: { type: mongoose.Schema.Types.ObjectId, ref: "Case", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    note: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("InternalNote", internalNoteSchema);
