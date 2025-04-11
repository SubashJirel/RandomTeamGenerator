const Team = require("../models/Team");

// Get all teams
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single team
exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new team
exports.createTeam = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Please provide team name" });
    }

    const team = new Team({ name });
    const savedTeam = await team.save();
    res.status(201).json(savedTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update team
exports.updateTeam = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Please provide team name" });
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json(updatedTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete team
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "Team deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
