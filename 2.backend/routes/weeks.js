const express = require("express");
const router = express.Router();
const { createWeek, getAllWeeks, getWeekById, updateWeek, deleteWeek } = require("../controllers/weeksController");

router.post("/", createWeek);
router.get("/", getAllWeeks);
router.get("/:id", getWeekById);
router.put("/:id", updateWeek);
router.delete("/:id", deleteWeek);

module.exports = router;
