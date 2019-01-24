const router = require("express").Router();
const leaderBRoutes = require("./LeaderBoards");

// Book routes
router.use("/books", leaderBRoutes);

module.exports = router;
