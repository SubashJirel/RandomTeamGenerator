const mongoose = require("mongoose");

const GeneratedTeamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  teams: [
    {
      teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
      teamName: {
        type: String,
        required: true,
      },
      players: [
        {
          playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Player",
          },
          playerName: {
            type: String,
          },
          skill: {
            type: Number,
          },
        },
      ],
      averageSkill: {
        type: Number,
      },
    },
  ],
  publicLink: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("GeneratedTeam", GeneratedTeamSchema);
