const express = require("express");
const router = express.Router();
const playerController = require("../controller/playerController");

router.get("/", playerController.getPlayers);
router.get("/:id", playerController.getPlayer);
router.post("/", playerController.createPlayers);
router.put("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);
router.get("/group/:groupId", playerController.getPlayersByGroup);

module.exports = router;
