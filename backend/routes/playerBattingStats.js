const express = require("express");
const router = express.Router();
const {
    createBattingStats,
    getAllBattingStats,
    getBattingStatsById,
    updateBattingStats,
    deleteBattingStats
} = require("../controllers/playerBattingStatsController");

router.post("/", createBattingStats);
router.get("/", getAllBattingStats);
router.get("/:id", getBattingStatsById);
router.put("/:id", updateBattingStats);
router.delete("/:id", deleteBattingStats);

module.exports = router;
