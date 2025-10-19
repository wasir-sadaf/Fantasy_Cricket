const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ------------------ Users ------------------
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// ------------------ UserProfiles ------------------
router.post("/profile", userController.createProfile); 
router.get("/profile/:id", userController.getProfile);
router.put("/profile/:id", userController.updateProfile);

// ------------------ UserSessions ------------------
router.get("/sessions/:id", userController.getSessions);
router.post("/sessions", userController.createSession);

// ------------------ UserFriends ------------------
router.get("/friends/:id", userController.getFriends);
router.post("/friends", userController.addFriend);

// ------------------ UserAchievements ------------------
router.get("/achievements/:id", userController.getAchievements);
router.post("/achievements", userController.addAchievement);

// ------------------ UserDevices ------------------
router.get("/devices/:id", userController.getDevices);
router.post("/devices", userController.addDevice);

// ------------------ UserNotifications ------------------
router.get("/notifications/:id", userController.getNotifications);
router.post("/notifications", userController.addNotification);
router.put("/notifications/read/:id", userController.markNotificationRead);

// ------------------ UserSettings ------------------
router.get("/settings/:id", userController.getSettings);
router.post("/settings", userController.addSetting);
router.put("/settings/:id", userController.updateSetting);

// ------------------ UserReports ------------------
router.get("/reports/:id", userController.getReports);
router.post("/reports", userController.addReport);

// ------------------ UserSuspensions ------------------
router.get("/suspensions/:id", userController.getSuspensions);
router.post("/suspensions", userController.addSuspension);

module.exports = router;
