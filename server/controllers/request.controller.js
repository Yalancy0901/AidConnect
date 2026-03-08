const Complaint = require("../models/request.model");
const { v4: uuidv4 } = require("uuid");

/* CREATE COMPLAINT */

const createComplaint = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      category,
      location,
      description
    } = req.body;

    const complaint = new Complaint({
      fullName,
      email,
      mobile,
      category,
      location,
      description,
      trackingId: uuidv4(),
      user: req.user?.id
    });

    await complaint.save();

    res.status(201).json({
      message: "Complaint submitted",
      trackingId: complaint.trackingId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* GET ALL COMPLAINTS */

const getComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }
};


/* GET USER COMPLAINTS */

const getUserComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find({
      user: req.user.id
    });

    res.json(complaints);

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

};


/* TRACK COMPLAINT */

const trackComplaint = async (req, res) => {

  try {

    const complaint = await Complaint.findOne({
      trackingId: req.params.id
    });

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    res.json(complaint);

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

};


/* DELETE */

const deleteRequest = async (req, res) => {

  try {

    const deleted = await Complaint.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    res.json({ message: "Complaint deleted" });

  } catch (error) {

    res.status(500).json({ message: "Delete failed" });

  }

};

module.exports = {
  createComplaint,
  getComplaints,
  getUserComplaints,
  trackComplaint,
  deleteRequest
};