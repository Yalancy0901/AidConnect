const Complaint = require("../models/request.model");
const User = require("../models/user.model");
const Funding = require("../models/funding.model");

exports.getDashboardAnalytics = async (req, res) => {

  try {

    /* BASIC COUNTS */

    const totalComplaints = await Complaint.countDocuments();
    const resolved = await Complaint.countDocuments({ status: "resolved" });
    const inProgress = await Complaint.countDocuments({ status: "inProgress" });
    const todo = await Complaint.countDocuments({ status: "todo" });
    const unassigned = await Complaint.countDocuments({ status: "unassigned" });
    const blocked = await Complaint.countDocuments({ status: "blocked" });

    const totalUsers = await User.countDocuments();

    /* ---------------- STATUS GRAPH ---------------- */

const statusData = [
  { name: "Resolved", value: resolved },
  { name: "In Progress", value: inProgress },
  { name: "To Do", value: todo },
  { name: "Unassigned", value: unassigned },
  { name: "Blocked", value: blocked }
];
    /* ---------------- DEMAND ---------------- */

    const complaints = await Complaint.find();

    const COST_PER_CATEGORY = {
      "Water and Sanitation": 5000,
      "Healthcare and Medical Support": 8000,
      "Education": 6000,
      "Infrastructure and Public Utilities": 7000,
      "Livelihood and Financial Support": 6000,
      "Emergency / Disaster Relief": 8000,
      "Others": 5000
    };

    const demandMap = {};

    complaints.forEach(c => {

      const category = c.category || "Others";

      const cost = COST_PER_CATEGORY[category] || 5000;

      if (!demandMap[category]) {
        demandMap[category] = 0;
      }

      demandMap[category] += cost;

    });

    /* ---------------- SUPPLY ---------------- */

    const funding = await Funding.find();

    const supplyMap = {};

    funding.forEach(f => {

      const category = f.category || "Others";

      if (!supplyMap[category]) {
        supplyMap[category] = 0;
      }

      supplyMap[category] += f.amount;

    });

    /* ---------------- LOCATION DATA ---------------- */

const locationData = await Complaint.aggregate([
  {
    $group: {
      _id: "$location",
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      location: "$_id",
      count: 1,
      _id: 0
    }
  }
]);

/* ---------------- TIMELINE DATA ---------------- */

const timelineData = await Complaint.aggregate([
  {
    $group: {
      _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt"
        }
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  },
  {
    $project: {
      date: "$_id",
      count: 1,
      _id: 0
    }
  }
]);

    /* ---------------- MERGE ---------------- */

    const categories = new Set([
      ...Object.keys(demandMap),
      ...Object.keys(supplyMap)
    ]);

    const demandSupplyData = [];

    categories.forEach(cat => {

      demandSupplyData.push({
        category: cat,
        demand: demandMap[cat] || 0,
        supply: supplyMap[cat] || 0
      });

    });

    /* ---------------- TOTAL FUNDING ---------------- */

    const fundingTotal = funding.reduce(
      (sum, f) => sum + f.amount,
      0
    );

    /* ---------------- RECENT COMPLAINTS ---------------- */

    const recentComplaints = await Complaint.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("category location status");

    /* ---------------- RESPONSE ---------------- */

    res.json({
  totalComplaints,
  resolved,
  inProgress,
  todo,
  unassigned,
  blocked,
  totalUsers,
  fundingTotal,

  demandSupplyData,
  statusData,
  locationData,
  timelineData,

  recentComplaints
});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};