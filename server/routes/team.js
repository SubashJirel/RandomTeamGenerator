const express = require("express");
const router = express.Router();
const teamController = require("../controller/TeamController");

router.get("/", teamController.getTeams);
router.get("/:id", teamController.getTeam);
router.post("/", teamController.createTeam);
router.put("/:id", teamController.updateTeam);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
