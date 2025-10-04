const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
const leagueRoutes = require("./routes/leagues");
const teamRoutes = require("./routes/teams");
const playerRoutes = require("./routes/players");
const fantasyTeamRoutes = require("./routes/fantasyTeams");
const fantasyTeamPlayerRoutes = require("./routes/fantasyTeamPlayers");

app.use("/api/auth", authRoutes);
app.use("/api/league", leagueRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/fantasyteam", fantasyTeamRoutes);
app.use("/api/fantasyteamplayer", fantasyTeamPlayerRoutes);

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server online on port ${port}`);
})