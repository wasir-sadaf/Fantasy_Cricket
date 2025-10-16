const express = require("express");
const router = express.Router();
const {createPlayerStats, getAllPlayerStats, getPlayerStatsById, updatePlayerStats, deletePlayerStats} = require("../controllers/playerStatsController");

router.post("/", createPlayerStats);
router.get("/", getAllPlayerStats);
router.get("/:id", getPlayerStatsById);
router.post("/:id", updatePlayerStats);
router.delete("/:id", deletePlayerStats);

module.exports = router;