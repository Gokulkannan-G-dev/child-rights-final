const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/caseController");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

router.use(requireAuth, requireRole("reviewer", "admin"));

router.get("/", ctrl.listCases);
router.get("/:id", ctrl.getCase);
router.patch("/:id", ctrl.updateCase);
router.post("/:id/notes", ctrl.addNote);
router.post("/:id/escalate", ctrl.escalateCase);
router.get("/:id/audit-log", ctrl.getAuditLog);

module.exports = router;
