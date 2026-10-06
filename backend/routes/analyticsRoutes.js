const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/analyticsController");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

router.use(requireAuth, requireRole("admin"));
router.get("/summary", ctrl.summary);
router.get("/case-trends", ctrl.caseTrends);

module.exports = router;
