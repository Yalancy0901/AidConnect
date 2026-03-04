const Complaint = require("../models/request.model");

// 🔹 Generate Unique Tracking ID
const generateTrackingId = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `CMP-${Date.now().toString().slice(-4)}${random}`;
};

// 🔹 CREATE COMPLAINT (Logged-in user only)
exports.createComplaint = async (req, res) => {
  try {
    const trackingId = generateTrackingId();

    const complaint = await Complaint.create({
      trackingId,
      ...req.body,
      user: req.user.id, // comes from auth middleware
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 GET ALL COMPLAINTS (Admin / Dashboard)
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 GET ONLY LOGGED-IN USER COMPLAINTS
exports.getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 TRACK BY TRACKING ID (Public)
exports.trackComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      trackingId: req.params.id,
    });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};