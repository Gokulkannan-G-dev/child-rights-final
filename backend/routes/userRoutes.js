const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/me", requireAuth, ctrl.getProfile);
router.patch("/me", requireAuth, ctrl.updateProfile);

module.exports = router;
