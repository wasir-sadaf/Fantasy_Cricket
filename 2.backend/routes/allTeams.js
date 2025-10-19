const express = require("express");
const router = express.Router();
const teamController = require("../controllers/allTeamController");

// ------------------ RealTeams ------------------
router.get("/realteams", teamController.getAllRealTeams);
router.get("/realteams/:id", teamController.getRealTeamById);
router.post("/realteams", teamController.createRealTeam);

// ------------------ Players ------------------
router.get("/players", teamController.getAllPlayers);
router.get("/players/:id", teamController.getPlayerById);
router.post("/players", teamController.createPlayer);

// ------------------ FantasyTeams ------------------
router.get("/fantasyteams", teamController.getAllFantasyTeams);
router.get("/fantasyteams/:id", teamController.getFantasyTeamById);
router.post("/fantasyteams", teamController.createFantasyTeam);

// ------------------ FantasyTeamPlayers ------------------
router.get("/fantasyteams/:fantasy_team_id/players", teamController.getFantasyTeamPlayers);
router.post("/fantasyteamplayers", teamController.addFantasyTeamPlayer);

// ------------------ FantasyTransfers ------------------
router.get("/transfers", teamController.getFantasyTransfers);
router.post("/transfers", teamController.createFantasyTransfer);

// ------------------ FantasyTeamHistory ------------------
router.get("/fantasyteams/:fantasy_team_id/history", teamController.getFantasyTeamHistory);

// ------------------ FantasyCaptainHistory ------------------
router.get("/fantasyteams/:fantasy_team_id/captainhistory", teamController.getFantasyCaptainHistory);

// ------------------ FantasyBudget ------------------
router.get("/fantasyteams/:fantasy_team_id/budget", teamController.getFantasyBudget);
router.put("/fantasyteams/:fantasy_team_id/budget", teamController.updateFantasyBudget);

module.exports = router;
