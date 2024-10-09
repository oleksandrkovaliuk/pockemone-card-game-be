const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  nonce: { type: Number, default: crypto.randomInt(1, 1000000) },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
