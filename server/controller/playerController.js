const Player = require("../models/players"); // Updated to match the filename

// Get all players
exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single player
exports.getPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new player
exports.createPlayer = async (req, res) => {
  try {
    const { name, skill } = req.body;

    if (!name || !skill) {
      return res
        .status(400)
        .json({ message: "Please provide name and skill level" });
    }

    const player = new Player({
      name,
      skill: parseInt(skill),
    });

    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update player
exports.updatePlayer = async (req, res) => {
  try {
    const { name, skill } = req.body;

    if (!name || !skill) {
      return res
        .status(400)
        .json({ message: "Please provide name and skill level" });
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      { name, skill: parseInt(skill) },
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete player
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
