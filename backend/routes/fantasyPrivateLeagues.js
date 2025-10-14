const express = require("express");
const router = express.Router();
const { createPrivateLeague, getAllPrivateLeagues, getPrivateLeagueById } = require("../controllers/fantasyPrivateLeagueController");

router.post("/", createPrivateLeague);
router.get("/", getAllPrivateLeagues);
router.get("/:id", getPrivateLeagueById);

module.exports = router;
