const express = require("express");
const router = express.Router();
const  {createPlayer, getAllPlayer, getPlayerById, updatePlayer, deletePlayer} = require("../controllers/playerController");

router.post("/", createPlayer);
router.get("/", getAllPlayer);
router.get("/:id", getPlayerById);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

module.exports = router;