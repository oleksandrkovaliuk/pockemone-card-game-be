const Web3 = require("web3");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const User = require("../../config/schemas/userModel");

const authenticateUser = async (req, res) => {
  const { walletAddress, signature } = req.body;

  try {
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const message = `${process.env.AUTHENTICATION_MESSAGE} ${user.nonce}`;
    const signer = Web3.eth.accounts.recover(message, signature);

    if (signer.toLowerCase() === walletAddress.toLowerCase()) {
      user.nonce = crypto.randomInt(1, 1000000);
      await user.save();

      const token = jwt.sign(
        {
          user_id: user._id,
        },
        process.env.JWT_SECURE_KEY,
        {
          expiresIn: "10h",
        }
      );

      return res.status(200).json({ token });
    } else {
      return res.status(400).json("Invalid signature");
    }
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = authenticateUser;
