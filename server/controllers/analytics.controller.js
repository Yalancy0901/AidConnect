const Complaint = require("../models/request.model");
const User = require("../models/user.model");

exports.getDashboardAnalytics = async (req, res) => {
  try {

    const totalComplaints = await Complaint.countDocuments();

    const resolved = await Complaint.countDocuments({ status: "resolved" });

    const inProgress = await Complaint.countDocuments({ status: "inProgress" });

    const todo = await Complaint.countDocuments({ status: "todo" });

    const unassigned = await Complaint.countDocuments({ status: "unassigned" });

    const blocked = await Complaint.countDocuments({ status: "blocked" });

    const totalUsers = await User.countDocuments();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    const demandAggregation = await Complaint.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    const demandData = demandAggregation.map(item => ({
      category: item._id,
      count: item.count
    }));

    const recentComplaints = await Complaint
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("category location status");

    res.json({
      totalComplaints,
      resolved,
      inProgress,
      todo,
      unassigned,
      blocked,
      demandData,
      recentComplaints,
      totalUsers,
      newUsers
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};