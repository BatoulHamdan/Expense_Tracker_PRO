const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const jwtPayload = jsonwebtoken.verify(accessToken, process.env.jwt_salt);
    req.user = jwtPayload;
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
    return;
  }
  next();
};

module.exports = auth;
