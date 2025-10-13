const express = require("express");
const router = express.Router();
const  {createMatch, getAllMatches, getMatchById, updateMatches, deleteMatch} = require("../controllers/matchController");

router.post("/", createMatch);
router.get("/", getAllMatches);
router.get("/:id", getMatchById);
router.put("/:id", updateMatches);
router.delete("/:id", deleteMatch);

module.exports = router;