const Fight = require("../../config/schemas/fightsCollectionModel");

const getCurrentFight = async (req, res) => {
  const params = req.query;

  try {
    if (!params.fightId) {
      return res.status(400).json({ message: "Fight ID is required" });
    }

    const fight = await Fight.findById(params.fightId);
    return res.status(200).json(fight);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = getCurrentFight;
