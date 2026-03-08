const express = require("express");
const router = express.Router();

const {
  addFunding,
  getFunding
} = require("../controllers/funding.controller");

router.post("/", addFunding);
router.get("/", getFunding);

module.exports = router;