const express = require("express");
const router = express.Router();
const {createFantasyTeam, getAllFantasyTeam, getFantasyTeamById, updateFantasyTeam, deleteFantasyTeam} = require("../controllers/fantasyTeamController");
const { route } = require("./players");

router.post("/", createFantasyTeam);
router.get("/", getAllFantasyTeam);
router.get("/:id", getFantasyTeamById);
router.put("/:id", updateFantasyTeam);
router.delete("/:id", deleteFantasyTeam);

module.exports = router;