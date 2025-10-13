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

const weeksRoutes = require("./routes/weeks");

const fantasyTeamRoutes = require("./routes/fantasyTeams");
const fantasyTeamPlayerRoutes = require("./routes/fantasyTeamPlayers");

const playerStatsRoutes = require("./routes/playerStats");
const playerBattingStatsRoutes = require("./routes/playerBattingStats");
const playerBowlingStatsRoutes = require("./routes/playerBowlingStats");
const playerFieldingStatsRoutes = require("./routes/playerFieldingStats");

const venueRoutes = require("./routes/venues");
const matchRoutes = require("./routes/matches");

const fixturesRoutes = require("./routes/fixtures");

const transactionRoutes = require("./routes/transactions");
const walletRoutes = require("./routes/wallets");
const depositRoutes = require("./routes/deposits");



//============================================================================================

app.use("/api/auth", authRoutes);
app.use("/api/league", leagueRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/player", playerRoutes);

app.use("/api/week", weeksRoutes);

app.use("/api/fantasyteam", fantasyTeamRoutes);
app.use("/api/fantasyteamplayer", fantasyTeamPlayerRoutes);

app.use("/api/playerstats", playerStatsRoutes);
app.use("/api/battingstats", playerBattingStatsRoutes);
app.use("/api/bowlingstats", playerBowlingStatsRoutes);
app.use("/api/fieldingstats", playerFieldingStatsRoutes);

app.use("/api/venue", venueRoutes);
app.use("/api/match", matchRoutes);

app.use("/api/fixture", fixturesRoutes);

app.use("/api/transaction", transactionRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/deposit", depositRoutes);


//============================================================================================

const port = 3000;
app.listen(port, ()=>{
    console.log(`Server online on port ${port}`);
})