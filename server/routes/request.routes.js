const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  getUserComplaints,
  trackComplaint
} = require("../controllers/request.controller");

const authMiddleware = require("../middleware/auth.middleware");
const Complaint = require("../models/request.model");


// Create complaint
router.post("/", authMiddleware, createComplaint);


// Get all complaints
router.get("/", getComplaints);


// Get logged-in user's complaints
router.get("/my", authMiddleware, getUserComplaints);


// Track complaint
router.get("/track/:id", trackComplaint);


// Update complaint status (Kanban board)
router.put("/:id/status", async (req, res) => {
  try {

    const { status } = req.body;

    const allowedStatus = [
      "unassigned",
      "todo",
      "inProgress",
      "blocked",
      "resolved"
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    res.json(updatedComplaint);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update status"
    });
  }
});


module.exports = router;