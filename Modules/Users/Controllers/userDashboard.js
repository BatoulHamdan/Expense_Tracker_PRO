const userDashboard = (req, res) => {
  console.log(req.user);
  res.status(200).json({
    status: "success",
    message: "User Dashboard!",
  });
};

module.exports = userDashboard;
