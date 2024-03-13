const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../Managers/emailManager");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, new_password, reset_code } = req.body;

  if (!email) throw "Email is required";
  if (!new_password) throw "Please provide new password!";
  if (!reset_code) throw "Reset code is required!";
  if (new_password.length < 6)
    throw "Password must be at least 6 characters long!";

  const getUserWithResetCode = await usersModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getUserWithResetCode) throw "Reset code does not match!";

  const hashedPassword = await bcrypt.hash(new_password, 12);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  const text = "Your password is reset successfully! If you have not done that please contact us.";
  const html = "Your password is reset successfully! If you have not done that please contact us.";

  await emailManager(
    email,
    "Password Reset Successfully - Expense Tracker PRO",
    text,
    html
  );

  res.status(200).json({
    status: "success",
    message: "Password is reset successfully!",
  });
};

module.exports = resetPassword;
