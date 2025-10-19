const express = require("express");
const router = express.Router();
const matchController = require("../controllers/allMatchController");

// ------------------ Matches ------------------
router.get("/matches", matchController.getAllMatches);
router.get("/matches/:id", matchController.getMatchById);
router.post("/matches", matchController.createMatch);
router.put("/matches/:id", matchController.updateMatch);
router.delete("/matches/:id", matchController.deleteMatch);

// ------------------ Fixtures ------------------
router.get("/fixtures", matchController.getAllFixtures);
router.get("/fixtures/:id", matchController.getFixtureById);
router.post("/fixtures", matchController.createFixture);

// ------------------ Venues ------------------
router.get("/venues", matchController.getAllVenues);
router.post("/venues", matchController.createVenue);

// ------------------ MatchOfficials ------------------
router.get("/officials", matchController.getAllMatchOfficials);
router.post("/officials", matchController.createMatchOfficial);

// ------------------ MatchOfficialsAssignment ------------------
router.get("/assignments", matchController.getAllAssignments);
router.post("/assignments", matchController.assignOfficial);

module.exports = router;
