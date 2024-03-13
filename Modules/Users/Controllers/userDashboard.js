const userDashboard = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "User Dashboard!",
      });
};

module.exports = userDashboard;
