const router = require("express").Router();
const getAllGames = require("../utils/gameList");

router.get("/", getAllGames);

module.exports = router;