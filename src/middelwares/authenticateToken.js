const jwt = require("jsonwebtoken");
const User = require("../config/schemas/userModel");

const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, no token provided" });
  }

  try {
    const userToken = token.split(" ")[1];

    const decoded = jwt.verify(userToken, process.env.JWT_SECURE_KEY);

    if (!decoded) throw Error("Invalid token");

    const user = await User.findById(decoded.user_id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateToken;
