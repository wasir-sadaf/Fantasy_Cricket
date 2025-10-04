const express = require("express");
const router = express.Router();
const {addPlayerToTeam, getTeamPlayer, removePlayerFromTeam} = require("../controllers/fantasyTeamPlayerController");

router.post("/", addPlayerToTeam);
router.get("/:fantasy_team_id", getTeamPlayer);
router.delete("/:id", removePlayerFromTeam);

module.exports = router;