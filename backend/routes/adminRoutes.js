const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/adminController");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

router.use(requireAuth, requireRole("admin"));

router.get("/users", ctrl.listUsers);
router.patch("/users/:id", ctrl.updateUserRole);
router.get("/verification-requests", ctrl.listVerificationRequests);
router.patch("/verification-requests/:id", ctrl.decideVerificationRequest);
router.get("/reports-export", ctrl.exportReports);

// Admin-managed organizations & routing rules referenced by the project plan.
// Backed by the Resource/Article models for now — split into their own
// Organization/RoutingRule models if this grows beyond simple config.
router.get("/organizations", (req, res) => res.json({ organizations: [] }));
router.get("/report-categories", (req, res) =>
  res.json({
    categories: [
      { id: "abuse", label: "Abuse", defaultOrganization: null },
      { id: "neglect", label: "Neglect", defaultOrganization: null },
      { id: "child_labor", label: "Child labor", defaultOrganization: null },
      { id: "educational_issue", label: "Educational issue", defaultOrganization: null },
      { id: "exploitation", label: "Exploitation", defaultOrganization: null },
      { id: "other", label: "Other", defaultOrganization: null }
    ]
  })
);

module.exports = router;
