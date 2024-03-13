const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { name, email, password, confirm_password, balance } = req.body;

  //Validations
  if (!name) throw "Name must be provided!";
  if (!email) throw "Email must be provided!";
  if (!password) throw "Password must be provided!";
  if (password.length < 6) throw "Password must be at least 6 characters long!";
  if (confirm_password !== password)
    throw "Password and confirm password does not match!";

  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "This email already exists!";

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = await jsonwebtoken.sign(
    {
      _id: createdUser._id,
      name: createdUser.name,
    },
    process.env.jwt_salt
  );

  res.status(201).json({
    status: "success",
    message: "User registered successfully!",
    accessToken: accessToken,
  });
};

module.exports = register;
