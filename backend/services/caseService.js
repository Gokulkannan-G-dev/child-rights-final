const Case = require("../models/Case");
const InternalNote = require("../models/InternalNote");
const logAudit = require("../utils/auditLogger");

async function listCases(filters = {}) {
  const query = {};
  if (filters.status) query.status = filters.status;
  const cases = await Case.find(query).populate("report").sort({ createdAt: -1 });
  return cases;
}

async function updateCaseStatus(caseId, status, actor) {
  const updated = await Case.findByIdAndUpdate(caseId, { status }, { new: true });
  await logAudit({ caseId, actorId: actor?._id, actorLabel: actor?.name || "Unknown", action: `Status changed to ${status}` });
  return updated;
}

async function addNote(caseId, note, actor) {
  const created = await InternalNote.create({ case: caseId, author: actor._id, note });
  await logAudit({ caseId, actorId: actor._id, actorLabel: actor.name, action: "Added internal note" });
  return created;
}

async function escalate(caseId, { organizationName, note }, actor) {
  const updated = await Case.findByIdAndUpdate(
    caseId,
    { status: "Escalated", escalatedTo: { organizationName, note, escalatedAt: new Date() } },
    { new: true }
  );
  await logAudit({ caseId, actorId: actor?._id, actorLabel: actor?.name, action: `Escalated to ${organizationName || "partner organization"}` });
  return updated;
}

module.exports = { listCases, updateCaseStatus, addNote, escalate };
