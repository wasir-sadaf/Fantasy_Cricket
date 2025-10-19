const db = require("../config/db.js");

// ------------------ Users ------------------
const getAllUsers = (req, res) => {
    const sql = "SELECT * FROM Users";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const getUserById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Users WHERE user_id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "User not found" });
        res.json(results[0]);
    });
};

const createUser = (req, res) => {
    const { name, email, role } = req.body;
    if (!name || !email) return res.status(400).json({ message: "Name and email are required" });

    const sql = "INSERT INTO Users (name, email, role) VALUES (?, ?, ?)";
    db.query(sql, [name, email, role || 'user'], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "User created successfully", user_id: result.insertId });
    });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    const sql = "UPDATE Users SET name=?, email=?, role=? WHERE user_id=?";
    db.query(sql, [name, email, role, id], (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "User updated successfully" });
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Users WHERE user_id=?";
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "User deleted successfully" });
    });
};

// ------------------ UserProfiles ------------------
const createProfile = (req, res) => {
    const { user_id, bio, avatar_url, country } = req.body;
    if (!user_id) return res.status(400).json({ message: "user_id is required" });

    const checkSql = "SELECT * FROM UserProfiles WHERE user_id=?";
    db.query(checkSql, [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (results.length > 0) {
            const updateSql = "UPDATE UserProfiles SET bio=?, avatar_url=?, country=? WHERE user_id=?";
            db.query(updateSql, [bio, avatar_url, country, user_id], (err) => {
                if (err) return res.status(500).json({ error: "Database error" });
                res.json({ message: "Profile updated successfully" });
            });
        } else {
            const insertSql = "INSERT INTO UserProfiles (user_id, bio, avatar_url, country) VALUES (?, ?, ?, ?)";
            db.query(insertSql, [user_id, bio, avatar_url, country], (err, result) => {
                if (err) return res.status(500).json({ error: "Database error" });
                res.status(201).json({ message: "Profile created successfully", profile_id: result.insertId });
            });
        }
    });
};

const getProfile = (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT up.*, u.name, u.email, u.role
        FROM UserProfiles up
        JOIN Users u ON up.user_id = u.user_id
        WHERE up.user_id = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ message: "Profile not found" });
        res.json(results[0]);
    });
};


const updateProfile = (req, res) => {
    const { id } = req.params;
    const { bio, avatar_url, country } = req.body;
    const sql = "UPDATE UserProfiles SET bio=?, avatar_url=?, country=? WHERE user_id=?";
    db.query(sql, [bio, avatar_url, country, id], (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Profile updated successfully" });
    });
};

// ------------------ UserSessions ------------------
const getSessions = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM UserSessions WHERE user_id=?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const createSession = (req, res) => {
    const { user_id, session_token, expires_at } = req.body;
    if (!user_id || !session_token) return res.status(400).json({ message: "user_id and session_token required" });

    const sql = "INSERT INTO UserSessions (user_id, session_token, expires_at) VALUES (?, ?, ?)";
    db.query(sql, [user_id, session_token, expires_at || null], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Session created", session_id: result.insertId });
    });
};

// ------------------ UserFriends ------------------
const getFriends = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT uf.friend_id, u.name, u.email, uf.status 
                 FROM UserFriends uf 
                 JOIN Users u ON uf.friend_id = u.user_id 
                 WHERE uf.user_id=?`;
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const addFriend = (req, res) => {
    const { user_id, friend_id } = req.body;
    const sql = "INSERT INTO UserFriends (user_id, friend_id) VALUES (?, ?)";
    db.query(sql, [user_id, friend_id], (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Friend request sent" });
    });
};

// ------------------ UserAchievements ------------------
const getAchievements = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT ua.*, u.name AS user_name 
                 FROM UserAchievements ua 
                 JOIN Users u ON ua.user_id = u.user_id 
                 WHERE ua.user_id=?`;
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const addAchievement = (req, res) => {
    const { user_id, title, description } = req.body;
    if (!user_id || !title) return res.status(400).json({ message: "user_id and title required" });

    const sql = "INSERT INTO UserAchievements (user_id, title, description) VALUES (?, ?, ?)";
    db.query(sql, [user_id, title, description], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Achievement added", achievement_id: result.insertId });
    });
};

// ------------------ UserDevices ------------------
const getDevices = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM UserDevices WHERE user_id=?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const addDevice = (req, res) => {
    const { user_id, device_name, device_type } = req.body;
    if (!user_id || !device_name) return res.status(400).json({ message: "user_id and device_name required" });

    const sql = "INSERT INTO UserDevices (user_id, device_name, device_type) VALUES (?, ?, ?)";
    db.query(sql, [user_id, device_name, device_type || null], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Device added", device_id: result.insertId });
    });
};

// ------------------ UserNotifications ------------------
const getNotifications = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM UserNotifications WHERE user_id=?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const addNotification = (req, res) => {
    const { user_id, message } = req.body;
    if (!user_id || !message) return res.status(400).json({ message: "user_id and message required" });

    const sql = "INSERT INTO UserNotifications (user_id, message) VALUES (?, ?)";
    db.query(sql, [user_id, message], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Notification added", notification_id: result.insertId });
    });
};

const markNotificationRead = (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE UserNotifications SET read_status=1 WHERE notification_id=?";
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Notification marked as read" });
    });
};

// ------------------ UserSettings ------------------
const getSettings = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM UserSettings WHERE user_id=?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const updateSetting = (req, res) => {
    const { id } = req.params;
    const { preference, value } = req.body;
    const sql = "UPDATE UserSettings SET value=? WHERE user_id=? AND preference=?";
    db.query(sql, [value, id, preference], (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Setting updated" });
    });
};

const addSetting = (req, res) => {
    const { user_id, preference, value } = req.body;
    if (!user_id || !preference) return res.status(400).json({ message: "user_id and preference required" });

    const sql = "INSERT INTO UserSettings (user_id, preference, value) VALUES (?, ?, ?)";
    db.query(sql, [user_id, preference, value], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Setting added", setting_id: result.insertId });
    });
};

// ------------------ UserReports ------------------
const getReports = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM UserReports WHERE user_id=? OR reported_by=?";
    db.query(sql, [id, id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const addReport = (req, res) => {
    const { user_id, reported_by, reason } = req.body;
    if (!user_id || !reported_by || !reason) return res.status(400).json({ message: "All fields required" });

    const sql = "INSERT INTO UserReports (user_id, reported_by, reason) VALUES (?, ?, ?)";
    db.query(sql, [user_id, reported_by, reason], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Report added", report_id: result.insertId });
    });
};

// ------------------ UserSuspensions ------------------
const getSuspensions = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM UserSuspensions WHERE user_id=?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};

const addSuspension = (req, res) => {
    const { user_id, reason, suspended_at, suspended_until } = req.body;
    if (!user_id || !reason) return res.status(400).json({ message: "user_id and reason required" });

    const sql = "INSERT INTO UserSuspensions (user_id, reason, suspended_at, suspended_until) VALUES (?, ?, ?, ?)";
    db.query(sql, [user_id, reason, suspended_at || new Date(), suspended_until || null], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Suspension added", suspension_id: result.insertId });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createProfile,
    getProfile,
    updateProfile,
    getSessions,
    createSession,
    getFriends,
    addFriend,
    getAchievements,
    addAchievement,
    getDevices,
    addDevice,
    getNotifications,
    addNotification,
    markNotificationRead,
    getSettings,
    addSetting,
    updateSetting,
    getReports,
    addReport,
    getSuspensions,
    addSuspension
};
