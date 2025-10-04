const express = require("express");
const router = express.Router();
const {createLeague, getAllLeague, getLeagueById} = require("../controllers/leagueController");

router.post("/", createLeague);
router.get("/", getAllLeague);
router.get("/:id", getLeagueById);

module.exports = router;