const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reportController");
const upload = require("../middleware/uploadMiddleware");
const { validateBody } = require("../middleware/validationMiddleware");

// Public — anonymous reporting is a core requirement of this platform.
router.post("/", validateBody(["category", "description"]), ctrl.createReport);
router.post("/:id/attachments", upload.single("file"), ctrl.uploadAttachment);
router.post("/:id/evidence", upload.single("file"), ctrl.uploadAttachment);
router.get("/track/:refCode", ctrl.trackByReference);
router.get("/status/:refCode", ctrl.trackByReference);

module.exports = router;
