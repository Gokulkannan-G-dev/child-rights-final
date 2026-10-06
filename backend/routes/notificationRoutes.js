const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/notificationController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", requireAuth, ctrl.list);
router.patch("/:id/read", requireAuth, ctrl.markRead);

module.exports = router;
