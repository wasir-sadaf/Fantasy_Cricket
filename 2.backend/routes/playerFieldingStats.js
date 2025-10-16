const express = require("express");
const router = express.Router();
const {
    createFieldingStats,
    getAllFieldingStats,
    getFieldingStatsById,
    updateFieldingStats,
    deleteFieldingStats
} = require("../controllers/playerFieldingStatsController");

router.post("/", createFieldingStats);
router.get("/", getAllFieldingStats);
router.get("/:id", getFieldingStatsById);
router.put("/:id", updateFieldingStats);
router.delete("/:id", deleteFieldingStats);

module.exports = router;
