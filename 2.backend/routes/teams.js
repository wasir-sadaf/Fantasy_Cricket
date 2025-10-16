const express = require("express");
const router = express.Router();
const {createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam} = require("../controllers/teamController");

router.post("/", createTeam);
router.get("/", getAllTeams);
router.get("/:id", getTeamById);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

module.exports = router;
