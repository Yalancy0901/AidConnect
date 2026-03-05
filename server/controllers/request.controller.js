const Complaint = require("../models/request.model");


// CREATE COMPLAINT
const createComplaint = async (req, res) => {

  try {

    const complaint = new Complaint({
      ...req.body,
      user: req.user?.id
    });

    await complaint.save();

    res.status(201).json(complaint);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create complaint" });
  }

};



// GET ALL COMPLAINTS
const getComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Failed to fetch complaints" });

  }

};



// GET USER COMPLAINTS
const getUserComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find({ user: req.user.id });

    res.json(complaints);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Failed to fetch user complaints" });

  }

};



// TRACK COMPLAINT
const trackComplaint = async (req, res) => {

  try {

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Tracking failed" });

  }

};



// DELETE COMPLAINT
const deleteRequest = async (req, res) => {

  try {

    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ message: "Complaint deleted successfully" });

  } catch (error) {

    console.error(error);
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