const express = require("express");
const router = express.Router();
const leagueController = require("../controllers/allLeagueController");

// ------------------ Leagues ------------------
router.get("/", leagueController.getAllLeagues);
router.get("/:id", leagueController.getLeagueById);
router.post("/", leagueController.createLeague);
router.put("/:id", leagueController.updateLeague);
router.delete("/:id", leagueController.deleteLeague);

// ------------------ FantasyPrivateLeagues ------------------
router.get("/fantasy", leagueController.getAllFantasyPrivateLeagues);
router.get("/fantasy/:id", leagueController.getFantasyPrivateLeagueById);
router.post("/fantasy", leagueController.createFantasyPrivateLeague);

// ------------------ FantasyPrivateLeagueMembers ------------------
router.get("/fantasy/:fpl_id/members", leagueController.getMembers);
router.post("/fantasy/members", leagueController.addMember);

// ------------------ EntryFees ------------------
router.get("/entryfees", leagueController.getEntryFees);
router.post("/entryfees", leagueController.createEntryFee);

// ------------------ Prizes ------------------
router.get("/prizes", leagueController.getPrizes);
router.post("/prizes", leagueController.createPrize);

// ------------------ Sponsorships ------------------
router.get("/sponsorships", leagueController.getSponsorships);
router.post("/sponsorships", leagueController.createSponsorship);

// ------------------ Ads ------------------
router.get("/ads", leagueController.getAds);
router.post("/ads", leagueController.createAd);

module.exports = router;
