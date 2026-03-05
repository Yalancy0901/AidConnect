const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  getUserComplaints,
  trackComplaint,
  deleteRequest
} = require("../controllers/request.controller");

const authMiddleware = require("../middleware/auth.middleware");
const Complaint = require("../models/request.model");


// CREATE COMPLAINT
router.post("/", authMiddleware, createComplaint);


// GET ALL COMPLAINTS
router.get("/", getComplaints);


// GET USER COMPLAINTS
router.get("/my", authMiddleware, getUserComplaints);


// TRACK COMPLAINT
router.get("/track/:id", trackComplaint);


// DELETE COMPLAINT
router.delete("/:id", deleteRequest);


// UPDATE STATUS
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
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(updatedComplaint);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;