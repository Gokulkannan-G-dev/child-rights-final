const reportService = require("../services/reportService");
const { sanitizeUpload } = require("../services/metadataService");
const Report = require("../models/Report");

async function createReport(req, res, next) {
  try {
    const { category, urgency, description, childAge, location, isAnonymous, contact, language } = req.body;
    const { report, case: openedCase } = await reportService.createReport({
      category,
      urgency,
      description,
      childAge,
      location,
      isAnonymous,
      contact,
      language
    });
    res.status(201).json({ reportId: report._id, caseId: openedCase._id, referenceCode: report.refCode });
  } catch (err) {
    next(err);
  }
}

async function uploadAttachment(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded." });
    const cleaned = await sanitizeUpload(req.file);
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { $push: { attachments: { originalName: req.file.originalname, storedPath: cleaned.path } } },
      { new: true }
    );
    if (!report) return res.status(404).json({ message: "Report not found." });
    res.status(201).json({ message: "Attachment uploaded." });
  } catch (err) {
    next(err);
  }
}

async function trackByReference(req, res, next) {
  try {
    const report = await reportService.findByReferenceCode(req.params.refCode);
    if (!report) return res.status(404).json({ message: "We couldn't find a report with that reference code." });
    res.json({
      report: {
        refCode: report.refCode,
        status: report.case?.status || "Pending",
        updatedAt: report.case?.updatedAt || report.updatedAt
      }
    });
  } catch (err) {
    next(err);
  }
}

async function listCategories(req, res) {
  res.json({ categories: ["Abuse", "Neglect", "Child labor", "Educational issue", "Exploitation", "Other"] });
}

module.exports = { createReport, uploadAttachment, trackByReference, listCategories };
