const Report = require("../models/Report");
const Case = require("../models/Case");
const User = require("../models/User");
const VerificationRequest = require("../models/VerificationRequest");

async function getDashboardSummary() {
  const [totalReports, activeUsers, pendingVerifications, escalatedCases] = await Promise.all([
    Report.countDocuments(),
    User.countDocuments({ isVerified: true }),
    VerificationRequest.countDocuments({ status: "pending" }),
    Case.countDocuments({ status: "Escalated" })
  ]);
  return { totalReports, activeUsers, pendingVerifications, escalatedCases };
}

async function getCaseTrends() {
  // A minimal placeholder trend aggregation — extend with a real date-bucketed
  // aggregation pipeline once there's enough data to make it meaningful.
  const cases = await Case.find().sort({ createdAt: 1 });
  return cases.map((c) => ({
    date: c.createdAt.toISOString().slice(0, 10),
    newCases: 1,
    resolved: c.status === "Resolved" ? 1 : 0
  }));
}

module.exports = { getDashboardSummary, getCaseTrends };
