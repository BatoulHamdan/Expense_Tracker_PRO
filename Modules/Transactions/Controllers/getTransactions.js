const mongoose = require("mongoose");

const getTransactions = async (req, res) => {
  const transactionModel = mongoose.model("transactions");

  const transactions = await transactionModel.find({
    user_id: req.user._id,
    ...req.query, //transaction_type: income
  });

  res.status(200).json({
    state: "success",
    data: transactions,
  });
};

module.exports = getTransactions;
