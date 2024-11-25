const router = require("express").Router();
const {randomGame} = require("../controllers/steamStore");

router.get("/random", randomGame);

module.exports = router;