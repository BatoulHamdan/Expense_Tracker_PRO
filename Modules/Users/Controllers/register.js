const mongoose = require("mongoose");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { name, email, password, confirm_password, balance } = req.body;

  //Validations
  if (!name) throw "Name must be provided!";
  if (!email) throw "Email must be provided!";
  if (!password) throw "Password must be provided!";
  if (password.length < 6)
    throw "Password must be at least 6 characters long!";
  if (confirm_password !== password)
    throw "Password and confirm password does not match!";

  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "This email already exists!";

  await usersModel.create({
    name: name,
    email: email,
    password: password,
    balance: balance,
  });

  res.status(201).json({
    status: "User registered successfully!",
  });
};

module.exports = register;
