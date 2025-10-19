const express = require("express");
const router = express.Router();
const statsController = require("../controllers/allStatsController");

// ------------------ PlayerStats ------------------
router.get("/playerstats", statsController.getAllPlayerStats);
router.get("/playerstats/:id", statsController.getPlayerStatsById);

// ------------------ PlayerBattingStats ------------------
router.get("/battingstats", statsController.getAllPlayerBattingStats);

// ------------------ PlayerBowlingStats ------------------
router.get("/bowlingstats", statsController.getAllPlayerBowlingStats);

// ------------------ PlayerFieldingStats ------------------
router.get("/fieldingstats", statsController.getAllPlayerFieldingStats);

// ------------------ PlayerSeasonStats ------------------
router.get("/seasonstats", statsController.getAllPlayerSeasonStats);

// ------------------ PlayerRankings ------------------
router.get("/rankings", statsController.getAllPlayerRankings);

// ------------------ PlayerInjuries ------------------
router.get("/injuries", statsController.getAllPlayerInjuries);

// ------------------ PlayerAvailability ------------------
router.get("/availability", statsController.getAllPlayerAvailability);

module.exports = router;
