const express = require("express");
const router = express.Router();
const {
    createBowlingStats,
    getAllBowlingStats,
    getBowlingStatsById,
    updateBowlingStats,
    deleteBowlingStats
} = require("../controllers/playerBowlingStatsController");

router.post("/", createBowlingStats);
router.get("/", getAllBowlingStats);
router.get("/:id", getBowlingStatsById);
router.put("/:id", updateBowlingStats);
router.delete("/:id", deleteBowlingStats);

module.exports = router;
