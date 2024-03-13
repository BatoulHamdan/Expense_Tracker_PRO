//to be updated

const mongoose = require("mongoose");
const validator = require("validator");

const deleteTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");

  const { transaction_id } = req.body;

  if (!transaction_id) throw "Transaction id is required!";

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid id!";

  const getTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) throw "Transaction not found!";

  console.log(getTransaction);

  if (getTransaction.transaction_type === "income") {
    // income logic here

    await usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } else {
    // expense logic here

    await usersModel.updateOne(
      {
        _id: getTransaction.user_id,
      },
      {
        $inc: {
          balance: getTransaction.amount,
        },
      },
      {
        runValidators: true,
      }
    );
  }

  await transactionModel.deleteOne({
    _id: transaction_id,
  });

  res.status(200).json({
    status: "Deleted Successfully!",
  });
};

module.exports = deleteTransaction;
