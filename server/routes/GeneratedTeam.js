const express = require("express");
const router = express.Router();
const generatedTeamController = require("../controller/generatedTeamController");

router.get("/", generatedTeamController.getGeneratedTeams);
router.get("/link/:link", generatedTeamController.getGeneratedTeamByLink);
router.post("/generate", generatedTeamController.generateTeams);
router.post("/generateGroup", generatedTeamController.generateTeamsFromGroup);

module.exports = router;
