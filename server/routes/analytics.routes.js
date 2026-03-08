const express = require("express");
const router = express.Router();

const {
  getDashboardAnalytics
} = require("../controllers/analytics.controller");

router.get("/dashboard", getDashboardAnalytics);

module.exports = router;