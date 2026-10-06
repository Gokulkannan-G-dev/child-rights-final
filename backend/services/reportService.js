const generateReferenceCode = require("../utils/generateReferenceCode");
const Report = require("../models/Report");
const Case = require("../models/Case");
const logAudit = require("../utils/auditLogger");

async function createReport(payload) {
  let refCode = generateReferenceCode();
  // Ensure uniqueness in the unlikely event of a collision.
  while (await Report.findOne({ refCode })) {
    refCode = generateReferenceCode();
  }

  const report = await Report.create({ ...payload, refCode });

  const createdCase = await Case.create({
    report: report._id,
    refCode: report.refCode,
    status: "Pending"
  });

  report.case = createdCase._id;
  await report.save();

  await logAudit({ caseId: createdCase._id, actorLabel: "System", action: "Report submitted and case opened" });

  return { report, case: createdCase };
}

async function findByReferenceCode(refCode) {
  const report = await Report.findOne({ refCode }).populate("case");
  return report;
}

module.exports = { createReport, findByReferenceCode };
