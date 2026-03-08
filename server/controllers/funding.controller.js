const Funding = require("../models/funding.model");

/* ADD FUNDING */

exports.addFunding = async (req, res) => {
  try {

    const { companyName, type, amount, villages, status } = req.body;

    const funding = new Funding({
      companyName,
      type,
      amount,
      villages,
      status
    });

    const savedFunding = await funding.save();

    res.status(201).json(savedFunding);

  } catch (error) {

    console.error("Funding error:", error);

    res.status(500).json({
      message: "Failed to add funding"
    });

  }
};


/* GET FUNDING */

exports.getFunding = async (req, res) => {
  try {

    const funding = await Funding.find().sort({ createdAt: -1 });

    res.json(funding);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch funding"
    });

  }
};