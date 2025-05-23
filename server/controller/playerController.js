const { v4: uuidv4 } = require("uuid");
const Player = require("../models/Players");

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

//create multiple players
exports.createPlayers = async (req, res) => {
  try {
    const players = req.body.players;

    if (!Array.isArray(players) || players.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide an array of players" });
    }

    const groupId = uuidv4();

    const newPlayers = players.map((p) => ({
      name: p.name,
      skill: parseInt(p.skill),
      groupId,
    }));

    const savedPlayers = await Player.insertMany(newPlayers);

    res.status(201).json({ groupId, players: savedPlayers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Retrieve Players by Group
exports.getPlayersByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const players = await Player.find({ groupId });

    if (players.length === 0) {
      return res
        .status(404)
        .json({ message: "No players found for this group" });
    }

    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
