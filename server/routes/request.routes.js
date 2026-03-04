const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  getUserComplaints,
  trackComplaint,
} = require("../controllers/request.controller");

const authMiddleware = require("../middleware/auth.middleware");

// 🔹 Create Complaint (Must be logged in)
router.post("/", authMiddleware, createComplaint);

// 🔹 Get all complaints (Dashboard)
router.get("/", getComplaints);

// 🔹 Get logged-in user's complaints
router.get("/my", authMiddleware, getUserComplaints);

// 🔹 Track complaint by tracking ID (Public)
router.get("/track/:id", trackComplaint);

module.exports = router;