const mongoose = require("mongoose");
const emailManager = require("../../../Managers/emailManager");

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email } = req.body;

  if (!email) throw "Email is required!";

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "The email does not exist!";

  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );

  const text = "Your password reset code is " + resetCode;
  const html = "Your password reset code is " + resetCode;

  await emailManager(
    email,
    "Reset your password - Expense Tracker PRO",
    text,
    html
  );

  res.status(200).json({
    status: "Reset code sent to email successfully!",
  });
};

module.exports = forgotPassword;
