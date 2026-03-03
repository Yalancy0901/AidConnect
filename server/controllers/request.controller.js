const Request = require("../models/request.model");

exports.createRequest = async (req, res) => {
  try {
    const { title, description, amountNeeded } = req.body;

    const newRequest = await Request.create({
      title,
      description,
      amountNeeded,
      createdBy: req.user
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};