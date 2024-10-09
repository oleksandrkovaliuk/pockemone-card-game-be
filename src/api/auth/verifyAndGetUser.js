const verifyAndGetUser = async (req, res) => {
  const user = req.user;
  try {
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access." });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Expired or invalid token" });
  }
};

module.exports = verifyAndGetUser;
