const Case = require("../models/Case");
const AuditLog = require("../models/AuditLog");
const caseService = require("../services/caseService");

async function listCases(req, res, next) {
  try {
    const { status } = req.query;
    const cases = await caseService.listCases({ status });
    res.json({
      cases: cases.map((c) => ({
        id: c._id,
        refCode: c.refCode,
        category: c.report?.category,
        urgency: c.report?.urgency,
        location: c.report?.location,
        status: c.status,
        createdAt: c.createdAt,
        submittedAt: c.createdAt?.toLocaleDateString?.() || c.createdAt
      }))
    });
  } catch (err) {
    next(err);
  }
}

async function getCase(req, res, next) {
  try {
    const c = await Case.findById(req.params.id).populate("report");
    if (!c) return res.status(404).json({ message: "Case not found." });
    res.json({
      id: c._id,
      refCode: c.refCode,
      status: c.status,
      category: c.report?.category,
      urgency: c.report?.urgency,
      location: c.report?.location,
      description: c.report?.description,
      contact: c.report?.isAnonymous ? null : c.report?.contact,
      isAnonymous: c.report?.isAnonymous,
      createdAt: c.createdAt,
      childAge: c.report?.childAge
    });
  } catch (err) {
    next(err);
  }
}

async function updateCase(req, res, next) {
  try {
    const { status } = req.body;
    const updated = await caseService.updateCaseStatus(req.params.id, status, req.user);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function addNote(req, res, next) {
  try {
    const note = await caseService.addNote(req.params.id, req.body.note, req.user);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
}

async function escalateCase(req, res, next) {
  try {
    const { organizationId, organizationName, note } = req.body;
    const updated = await caseService.escalate(req.params.id, { organizationName: organizationName || organizationId, note }, req.user);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function getAuditLog(req, res, next) {
  try {
    const entries = await AuditLog.find({ case: req.params.id }).sort({ timestamp: 1 });
    res.json({ entries: entries.map((e) => ({ actor: e.actorLabel, action: e.action, timestamp: e.timestamp })) });
  } catch (err) {
    next(err);
  }
}

module.exports = { listCases, getCase, updateCase, addNote, escalateCase, getAuditLog };
