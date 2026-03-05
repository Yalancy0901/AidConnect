const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      unique: true,
    },
    fullName: String,
    email: String,
    mobile: String,
    category: String,
    location: String,
    description: String,
    image: String,
    status: {
      type: String,
      enum:  ["unassigned", "todo", "inProgress", "blocked", "resolved"],
      default: "Unassigned",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);