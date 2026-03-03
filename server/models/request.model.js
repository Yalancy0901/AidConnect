const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  title: String,
  description: String,
  amountNeeded: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);