const mongoose = require("mongoose");

const fundingSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    villages: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      default: "Active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Funding", fundingSchema);