const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/contentController");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

router.get("/articles", ctrl.listArticles);
router.get("/articles/:id", ctrl.getArticle);
router.post("/articles", requireAuth, requireRole("admin"), ctrl.createArticle);
router.patch("/articles/:id", requireAuth, requireRole("admin"), ctrl.updateArticle);
router.delete("/articles/:id", requireAuth, requireRole("admin"), ctrl.deleteArticle);

module.exports = router;
