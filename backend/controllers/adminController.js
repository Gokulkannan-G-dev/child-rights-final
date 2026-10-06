const User = require("../models/User");
const VerificationRequest = require("../models/VerificationRequest");
const Report = require("../models/Report");
const Case = require("../models/Case");

async function listUsers(req, res, next) {
  try {
    const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) {
    next(err);
  }
}

async function updateUserRole(req, res, next) {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

async function listVerificationRequests(req, res, next) {
  try {
    const requests = await VerificationRequest.find({ status: "pending" }).populate("user", "name email");
    res.json({ requests: requests.map((r) => ({ id: r._id, name: r.user?.name, organization: r.organization, role: r.role })) });
  } catch (err) {
    next(err);
  }
}

async function decideVerificationRequest(req, res, next) {
  try {
    const { decision } = req.body; // "approved" | "rejected"
    const request = await VerificationRequest.findByIdAndUpdate(req.params.id, { status: decision }, { new: true });
    if (!request) return res.status(404).json({ message: "Request not found." });
    if (decision === "approved") {
      await User.findByIdAndUpdate(request.user, { role: "reviewer" });
    }
    res.json({ request });
  } catch (err) {
    next(err);
  }
}

async function exportReports(req, res, next) {
  try {
    const { range } = req.query;
    const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const reports = await Report.find({ createdAt: { $gte: since } }).lean();
    const cases = await Case.find({ createdAt: { $gte: since } }).lean();
    res.json({ range, generatedAt: new Date(), reports, cases });
  } catch (err) {
    next(err);
  }
}

module.exports = { listUsers, updateUserRole, listVerificationRequests, decideVerificationRequest, exportReports };
