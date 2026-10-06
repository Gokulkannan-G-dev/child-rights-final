const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");
const { validateBody } = require("../middleware/validationMiddleware");

router.post("/register", validateBody(["name", "email", "password"]), ctrl.register);
router.post("/login", validateBody(["email", "password"]), ctrl.login);
router.get("/me", requireAuth, ctrl.me);
router.post("/forgot-password", validateBody(["email"]), ctrl.forgotPassword);
router.post("/verify-account", validateBody(["code"]), ctrl.verifyAccount);
router.post("/professional-verification", requireAuth, validateBody(["organization", "role"]), ctrl.professionalVerification);

module.exports = router;
