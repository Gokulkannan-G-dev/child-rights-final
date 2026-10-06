const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reportController");

router.get("/", ctrl.listCategories);

module.exports = router;
