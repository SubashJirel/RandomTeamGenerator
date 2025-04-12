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

// Update generated team
exports.generateTeamsFromGroup = async (req, res) => {
  try {
    const { groupId, numberOfTeams = 2, title = "Match Day Teams" } = req.body;

    if (!groupId) {
      return res.status(400).json({ message: "Group ID is required" });
    }

    const players = await Player.find({ groupId });

    if (players.length === 0) {
      return res
        .status(404)
        .json({ message: "No players found for this group" });
    }

    // Sort players by skill descending
    const sortedPlayers = [...players].sort((a, b) => b.skill - a.skill);

    // Initialize empty teams
    const teams = Array.from({ length: numberOfTeams }, () => []);

    // Zigzag distribute
    let direction = 1;
    let teamIndex = 0;
    for (const player of sortedPlayers) {
      teams[teamIndex].push(player);
      teamIndex += direction;

      if (teamIndex === numberOfTeams) {
        teamIndex = numberOfTeams - 1;
        direction = -1;
      } else if (teamIndex === -1) {
        teamIndex = 0;
        direction = 1;
      }
    }

    // Format teams for storage in GeneratedTeam
    const formattedTeams = await Promise.all(
      teams.map(async (teamPlayers, index) => {
        const teamDoc = new Team({
          name: `Team ${index + 1}`,
          players: teamPlayers.map((p) => p._id),
        });
        const savedTeam = await teamDoc.save();

        const totalSkill = teamPlayers.reduce((sum, p) => sum + p.skill, 0);
        const avgSkill = teamPlayers.length
          ? (totalSkill / teamPlayers.length).toFixed(2)
          : 0;

        return {
          teamId: savedTeam._id,
          teamName: savedTeam.name,
          players: teamPlayers.map((p) => ({
            playerId: p._id,
            playerName: p.name,
            skill: p.skill,
          })),
          averageSkill: parseFloat(avgSkill),
        };
      })
    );

    const publicLink = crypto.randomBytes(8).toString("hex");

    const generatedTeam = new GeneratedTeam({
      title,
      teams: formattedTeams,
      publicLink,
    });

    const savedGeneratedTeam = await generatedTeam.save();
    res.status(201).json(savedGeneratedTeam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating teams" });
  }
};
