const AuditLog = require("../models/AuditLog");

async function logAudit({ caseId, actorId, actorLabel, action }) {
  return AuditLog.create({
    case: caseId,
    actor: actorId,
    actorLabel,
    action,
    timestamp: new Date()
  });
}

module.exports = logAudit;
