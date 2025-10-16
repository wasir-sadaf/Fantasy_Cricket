const express = require("express");
const router = express.Router();
const { createFixture, getAllFixtures, getFixtureById, updateFixture, deleteFixture } = require("../controllers/fixtureController");

router.post("/", createFixture);
router.get("/", getAllFixtures);
router.get("/:id", getFixtureById);
router.put("/:id", updateFixture);
router.delete("/:id", deleteFixture);

module.exports = router;
