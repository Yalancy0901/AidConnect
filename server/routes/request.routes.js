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


router.post("/", authMiddleware, createComplaint);

router.get("/", getComplaints);

router.get("/my", authMiddleware, getUserComplaints);

router.get("/track/:id", trackComplaint);

router.delete("/:id", deleteRequest);

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

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      message: "Failed to update status"
    });

  }

});

module.exports = router;