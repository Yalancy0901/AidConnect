const express = require("express");
const router = express.Router();
const { createRequest } = require("../controllers/request.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, createRequest);

module.exports = router;