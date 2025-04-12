const GeneratedTeam = require("../models/GeneratedTeam");
const Player = require("../models/players");
const Team = require("../models/Team");
const crypto = require("crypto");

// Get all generated teams
exports.getGeneratedTeams = async (req, res) => {
  try {
    const generatedTeams = await GeneratedTeam.find().sort({ createdAt: -1 });
    res.json(generatedTeams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get generated team by public link
exports.getGeneratedTeamByLink = async (req, res) => {
  try {
    const publicLink = req.params.link;
    const generatedTeam = await GeneratedTeam.findOne({ publicLink });

    if (!generatedTeam) {
      return res.status(404).json({ message: "Teams not found" });
    }

    res.json(generatedTeam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generate balanced teams
exports.generateTeams = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Please provide a title" });
    }

    // Get all players and teams
    const players = await Player.find();
    const teams = await Team.find();

    if (players.length === 0) {
      return res.status(400).json({ message: "No players available" });
    }

    if (teams.length === 0) {
      return res.status(400).json({ message: "No teams available" });
    }

    // Sort players by skill level in descending order
    players.sort((a, b) => b.skill - a.skill);

    // Initialize teams with empty player arrays
    let generatedTeams = teams.map((team) => ({
      teamId: team._id,
      teamName: team.name,
      players: [],
      averageSkill: 0,
    }));

    // Distribute players using a zigzag pattern for balanced teams
    let direction = 1; // 1 for forward, -1 for backward
    let currentTeamIndex = 0;

    for (const player of players) {
      // Add player to current team
      generatedTeams[currentTeamIndex].players.push({
        playerId: player._id,
        playerName: player.name,
        skill: player.skill,
      });

      // Update current team index for next player
      if (direction === 1) {
        // Moving forward
        if (currentTeamIndex === generatedTeams.length - 1) {
          // Reached the end, change direction
          direction = -1;
        } else {
          currentTeamIndex++;
        }
      } else {
        // Moving backward
        if (currentTeamIndex === 0) {
          // Reached the beginning, change direction
          direction = 1;
        } else {
          currentTeamIndex--;
        }
      }
    }

    // Calculate average skill for each team
    generatedTeams = generatedTeams.map((team) => {
      const totalSkill = team.players.reduce(
        (sum, player) => sum + player.skill,
        0
      );
      return {
        ...team,
        averageSkill:
          team.players.length > 0
            ? (totalSkill / team.players.length).toFixed(2)
            : 0,
      };
    });

    // Generate a unique public link
    const publicLink = crypto.randomBytes(8).toString("hex");

    // Create and save the generated teams
    const generatedTeam = new GeneratedTeam({
      title,
      teams: generatedTeams,
      publicLink,
    });

    const savedGeneratedTeam = await generatedTeam.save();
    res.status(201).json(savedGeneratedTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
