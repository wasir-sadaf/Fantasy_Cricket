const express = require("express");
const router = express.Router();
const { joinPrivateLeague, getLeagueMembers } = require("../controllers/fantasyPrivateLeagueMemberController");


router.post("/join", joinPrivateLeague);
router.get("/:private_league_id/members", getLeagueMembers);

module.exports = router;
