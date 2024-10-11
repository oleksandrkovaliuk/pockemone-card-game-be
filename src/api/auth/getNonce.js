const User = require("../../config/schemas/userModel");

const getNonce = async (req, res) => {
  const params = req.query;
  try {
    let user = await User.findOne({ walletAddress: params.walletAddress });
    if (!user) {
      user = (await User.create({ walletAddress })).save();
    }

    return res.status(200).json({
      nonce: user.nonce,
    });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = getNonce;
